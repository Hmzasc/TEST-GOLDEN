// ============================================================
// نظام التعليقات المشترك — يُستخدم في كل صفحات الموقع
// يعتمد على وجود db و auth مُعرّفين مسبقاً في الصفحة (Firebase)
// وعلى وجود العناصر: #commentsList, #commentsCount (اختياري),
// #userName, #commentText, #submitCommentBtn
//
// المهم: بما أن حالة تسجيل الدخول (Firebase Auth) تبقى محفوظة
// عبر كل صفحات الموقع تلقائياً، فبمجرد أن يسجّل المسؤول دخوله
// من أي صفحة، ستظهر له أزرار حذف التعليقات في كل صفحة أخرى
// يزورها بعد ذلك مباشرة — دون الحاجة لتسجيل الدخول من جديد.
//
// التحديث اللحظي (Real-time): التعليقات تُحدَّث تلقائياً لحظة
// إضافة/حذف أي تعليق (عبر onSnapshot)، دون الحاجة لتحديث الصفحة.
// ============================================================
(function () {
    const ADMIN_EMAIL_FALLBACK = 'centergolden04@gmail.com';
    let commentsCache = [];
    let hasLoadedOnce = false;

    function getAdminEmail() {
        return (typeof ADMIN_EMAIL !== 'undefined' && ADMIN_EMAIL) ? ADMIN_EMAIL : ADMIN_EMAIL_FALLBACK;
    }

    function escapeHtml(text) {
        const d = document.createElement('div');
        d.textContent = text == null ? '' : text;
        return d.innerHTML;
    }

    function isAdminNow() {
        return !!(typeof auth !== 'undefined' && auth.currentUser && auth.currentUser.email === getAdminEmail());
    }

    function toast(msg, type) {
        if (typeof showToast === 'function') { showToast(msg, type); }
    }

    // ============================================================
    // مودال تأكيد مصمم بنفس هوية الموقع (يستبدل confirm() الافتراضية)
    // ============================================================
    function showConfirmModal({ title, message, confirmText = 'حذف', cancelText = 'إلغاء' }) {
        return new Promise((resolve) => {
            const overlay = document.createElement('div');
            overlay.className = 'confirm-modal-overlay';
            overlay.innerHTML = `
                <div class="confirm-modal">
                    <div class="confirm-modal-icon"><i class="fas fa-exclamation-triangle"></i></div>
                    <h3 class="confirm-modal-title">${escapeHtml(title)}</h3>
                    <p class="confirm-modal-text">${escapeHtml(message)}</p>
                    <div class="confirm-modal-actions">
                        <button class="confirm-modal-btn confirm-modal-btn-cancel">${escapeHtml(cancelText)}</button>
                        <button class="confirm-modal-btn confirm-modal-btn-danger">${escapeHtml(confirmText)}</button>
                    </div>
                </div>
            `;
            document.body.appendChild(overlay);
            document.body.style.overflow = 'hidden';
            requestAnimationFrame(() => overlay.classList.add('active'));

            function close(result) {
                overlay.classList.remove('active');
                document.body.style.overflow = 'auto';
                setTimeout(() => overlay.remove(), 250);
                document.removeEventListener('keydown', escHandler);
                resolve(result);
            }
            function escHandler(e) {
                if (e.key === 'Escape') close(false);
            }

            overlay.querySelector('.confirm-modal-btn-cancel').addEventListener('click', () => close(false));
            overlay.querySelector('.confirm-modal-btn-danger').addEventListener('click', () => close(true));
            overlay.addEventListener('click', (e) => { if (e.target === overlay) close(false); });
            document.addEventListener('keydown', escHandler);
        });
    }

    // ============================================================
    // عرض التعليقات (يُستدعى من الكاش عند أي تغيير في البيانات أو حالة الدخول)
    // ============================================================
    function renderComments() {
        const list = document.getElementById('commentsList');
        const count = document.getElementById('commentsCount');
        if (!list) return;

        if (count) count.textContent = commentsCache.length;

        if (commentsCache.length === 0) {
            list.innerHTML = `<div class="no-comments"><i class="fas fa-comment-slash"></i><p>لا توجد تعليقات. كن أول من يعلق!</p></div>`;
            return;
        }

        const admin = isAdminNow();
        let html = '';
        commentsCache.forEach(c => {
            const name = c.name || 'زائر';
            const first = name.charAt(0).toUpperCase();
            const date = c.timestamp ? c.timestamp.toDate() : new Date(c.date);
            const dateStr = date.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
            const timeStr = date.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
            const deleteBtn = admin
                ? `<button class="comment-delete-btn" data-id="${c.id}" title="حذف التعليق"><i class="fas fa-trash"></i></button>`
                : '';
            html += `
          <div class="comment-card">
            <div class="comment-header">
              <div class="comment-avatar">${first}</div>
              <span class="comment-author">${escapeHtml(name)}</span>
              <span class="comment-date">${dateStr} • ${timeStr}</span>
              ${deleteBtn}
            </div>
            <div class="comment-text">${escapeHtml(c.text)}</div>
          </div>
        `;
        });
        list.innerHTML = html;

        list.querySelectorAll('.comment-delete-btn').forEach(btn => {
            btn.addEventListener('click', () => deleteComment(btn.dataset.id));
        });
    }

    // ============================================================
    // الاستماع اللحظي للتعليقات (onSnapshot) — يُفعَّل مرة واحدة فقط
    // ============================================================
    function startListening() {
        const list = document.getElementById('commentsList');
        if (!list || typeof db === 'undefined' || hasLoadedOnce) return;
        hasLoadedOnce = true;

        const page = window.location.pathname;
        list.innerHTML = '<div class="loading-comments"><i class="fas fa-spinner fa-spin"></i> جاري التحميل...</div>';

        db.collection('comments')
            .where('page', '==', page)
            .orderBy('timestamp', 'desc')
            .onSnapshot((snap) => {
                commentsCache = [];
                snap.forEach(doc => {
                    commentsCache.push({ id: doc.id, ...doc.data() });
                });
                renderComments();
            }, (e) => {
                console.error('comments onSnapshot error:', e);
                list.innerHTML = `<div class="no-comments"><i class="fas fa-exclamation-triangle"></i><p>حدث خطأ في تحميل التعليقات</p></div>`;
            });
    }

    async function deleteComment(id) {
        if (!isAdminNow()) {
            toast('يجب تسجيل الدخول كمسؤول أولاً', 'error');
            return;
        }
        const confirmed = await showConfirmModal({
            title: 'تأكيد الحذف',
            message: 'هل أنت متأكد من حذف هذا التعليق؟ لا يمكن التراجع عن هذا الإجراء.',
            confirmText: 'حذف',
            cancelText: 'إلغاء'
        });
        if (!confirmed) return;

        try {
            await db.collection('comments').doc(id).delete();
            toast('تم حذف التعليق بنجاح', 'success');
            // لا حاجة لإعادة التحميل يدوياً؛ التحديث اللحظي سيزيل التعليق تلقائياً
        } catch (e) {
            console.error('deleteComment error:', e);
            toast('حدث خطأ في الحذف', 'error');
        }
    }

    async function submitComment() {
        const nameInput = document.getElementById('userName');
        const textInput = document.getElementById('commentText');
        const btn = document.getElementById('submitCommentBtn');
        const name = (nameInput && nameInput.value ? nameInput.value : '').trim() || 'زائر';
        const text = (textInput && textInput.value ? textInput.value : '').trim();

        if (!text) { toast('يرجى كتابة تعليق', 'warning'); return; }
        if (text.length < 3) { toast('التعليق قصير جداً', 'warning'); return; }

        if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...'; }
        try {
            await db.collection('comments').add({
                name,
                text,
                page: window.location.pathname,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                date: new Date().toISOString()
            });
            toast('تم إضافة تعليقك بنجاح', 'success');
            if (textInput) textInput.value = '';
            // لا حاجة لإعادة التحميل يدوياً؛ التحديث اللحظي سيضيف التعليق تلقائياً
        } catch (e) {
            console.error('submitComment error:', e);
            toast('حدث خطأ في الإرسال', 'error');
        }
        if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-paper-plane"></i> إرسال التعليق'; }
    }

    function initComments() {
        const submitBtn = document.getElementById('submitCommentBtn');
        if (submitBtn) submitBtn.addEventListener('click', submitComment);

        startListening();

        // إعادة عرض التعليقات (من الكاش، دون طلب جديد) عند تغيّر حالة
        // الدخول (تسجيل دخول/خروج المسؤول) حتى تظهر/تختفي أزرار
        // الحذف فوراً دون تحديث الصفحة
        if (typeof auth !== 'undefined') {
            auth.onAuthStateChanged(() => {
                if (hasLoadedOnce) renderComments();
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initComments);
    } else {
        initComments();
    }

    // إتاحة الدوال عالمياً في حال احتاجتها صفحة أخرى
    window.loadComments = renderComments;
    window.showConfirmModal = showConfirmModal;
})();