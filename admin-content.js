// =====================================================================
// 🛠️ إدارة المحتوى عن بعد — لوحة تحكم الأدمن (بطاقات الدخول السريع)
// يعتمد على db / auth / showToast المُهيّأة مسبقاً في comments-script.js
// =====================================================================
(function () {
    const ADMIN_EMAIL = 'centergolden04@gmail.com';
    const COLLECTION = 'homeCards';

    const DEFAULT_CARDS = [
        { name: "المواد الدراسية", icon: "fas fa-book", desc: "تصفح الكتب والمراجع التعليمية لجميع المواد", link: "subjects.html", badge: "تصفح الآن", order: 0 },
        { name: "الامتحانات السابقة", icon: "fas fa-file-alt", desc: "امتحانات البكالوريا من السنوات السابقة", link: "exams.html", badge: "تصفح الآن", order: 1 },
        { name: "المسابقة الرمضانية", icon: "fas fa-moon", desc: "أسئلة المسابقة اليومية خلال شهر رمضان", link: "ramadan.html", badge: "تصفح الآن", order: 2 },
        { name: "تمارين المركز", icon: "fas fa-question", desc: "تمارين هامة من إعداد أساتذة المركز", link: "serie.html", badge: "تصفح الآن", order: 3 },
        { name: "نصائح للطلاب", icon: "fas fa-lightbulb", desc: "نصائح وإرشادات للتحضير والنجاح في البكالوريا", link: "tips.html", badge: "تصفح الآن", order: 4 },
        { name: "موقع المركز", icon: "fas fa-map-marker-alt", desc: "شاهد الفيديو التعريفي لموقع المركز", link: "location.html", badge: "تصفح الآن", order: 5 },
        { name: "استفسارات", icon: "fas fa-envelope", desc: "تواصل معنا وأرسل استفساراتك للمركز", link: "inquiry.html", badge: "أرسل الآن", order: 6 },
        { name: "النتائج", icon: "fas fa-chart-line", desc: "استعلام نتائج الباكلوريا، بريفة وكونكور", link: "résultats/index.html", badge: "استعلم الآن", order: 7 }
    ];

    const ICON_SUGGESTIONS = [
        "fas fa-book", "fas fa-file-alt", "fas fa-moon", "fas fa-question",
        "fas fa-lightbulb", "fas fa-map-marker-alt", "fas fa-envelope", "fas fa-chart-line",
        "fas fa-graduation-cap", "fas fa-calculator", "fas fa-flask", "fas fa-video"
    ];

    let allCards = [];
    let currentPageIdx = 0;
    const itemsPerPage = 4;
    let editingId = null;
    let pendingImageUrl = null;
    let seeded = false;

    function toast(msg, type) {
        if (typeof showToast === 'function') showToast(msg, type);
        else alert(msg);
    }

    function isAdminUser() {
        return !!(typeof auth !== 'undefined' && auth.currentUser && auth.currentUser.email === ADMIN_EMAIL);
    }

    // ---------------------------------------------------------------
    // تحميل البطاقات لحظياً من Firestore (مع بذر البيانات أول مرة)
    // ---------------------------------------------------------------
    function listen() {
        if (typeof db === 'undefined') { setTimeout(listen, 300); return; }
        db.collection(COLLECTION).orderBy('order').onSnapshot(async (snap) => {
            if (snap.empty && !seeded) {
                seeded = true;
                const batch = db.batch();
                DEFAULT_CARDS.forEach(card => {
                    const ref = db.collection(COLLECTION).doc();
                    batch.set(ref, card);
                });
                try { await batch.commit(); } catch (e) { console.error('seed error', e); }
                return; // سيُعاد الاستدعاء تلقائياً بعد الإضافة
            }
            allCards = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            const maxPage = Math.max(0, Math.ceil(allCards.length / itemsPerPage) - 1);
            if (currentPageIdx > maxPage) currentPageIdx = maxPage;
            renderCards();
            renderDots();
            updateAdminUI();
        }, (err) => {
            console.error('homeCards listen error', err);
        });
    }

    // ---------------------------------------------------------------
    // العرض
    // ---------------------------------------------------------------
    function iconOrImage(card) {
        if (card.imageUrl) return `<img src="${card.imageUrl}" alt="${escapeHtml(card.name)}">`;
        return `<i class="${card.icon || 'fas fa-star'}"></i>`;
    }

    function escapeHtml(str) {
        const d = document.createElement('div');
        d.textContent = str || '';
        return d.innerHTML;
    }

    function renderCards() {
        const container = document.getElementById('dynamicAccessCards');
        if (!container) return;
        const start = currentPageIdx * itemsPerPage;
        const pageItems = allCards.slice(start, start + itemsPerPage);
        const admin = isAdminUser();

        container.innerHTML = pageItems.map(card => `
            <a href="${escapeHtml(card.link)}" class="access-card" data-id="${card.id}">
                ${admin ? `
                <div class="card-admin-controls">
                    <button type="button" class="card-admin-btn edit" data-action="edit" data-id="${card.id}" title="تعديل"><i class="fas fa-pen"></i></button>
                    <button type="button" class="card-admin-btn del" data-action="del" data-id="${card.id}" title="حذف"><i class="fas fa-trash"></i></button>
                </div>` : ''}
                <div class="access-icon">${iconOrImage(card)}</div>
                <div class="card-text-wrapper">
                    <h3>${escapeHtml(card.name)}</h3>
                    <p>${escapeHtml(card.desc)}</p>
                    <span class="access-badge">${escapeHtml(card.badge)} <i class="fas fa-arrow-left"></i></span>
                </div>
            </a>
        `).join('') + (admin ? `<div class="add-card-tile" id="addCardTile"><i class="fas fa-plus"></i><span>إضافة قسم جديد</span></div>` : '');

        container.querySelectorAll('.access-card').forEach(cardEl => {
            cardEl.addEventListener('click', function (e) {
                if (e.target.closest('.card-admin-controls')) { e.preventDefault(); return; }
                e.preventDefault();
                const href = this.getAttribute('href');
                if (typeof showSpinner === 'function') showSpinner('جاري الانتقال...');
                setTimeout(() => { window.location.href = href; }, 700);
            });
        });

        container.querySelectorAll('[data-action="edit"]').forEach(btn => {
            btn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); openForm(btn.dataset.id); });
        });
        container.querySelectorAll('[data-action="del"]').forEach(btn => {
            btn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); confirmDelete(btn.dataset.id); });
        });
        document.getElementById('addCardTile')?.addEventListener('click', () => openForm(null));
    }

    function renderDots() {
        const dotsDiv = document.getElementById('cardsDotsContainer');
        if (!dotsDiv) return;
        const totalPages = Math.max(1, Math.ceil(allCards.length / itemsPerPage));
        dotsDiv.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === currentPageIdx) dot.classList.add('active');
            dot.addEventListener('click', () => { currentPageIdx = i; renderCards(); renderDots(); });
            dotsDiv.appendChild(dot);
        }
        const prevBtn = document.getElementById('prevCardsBtn');
        const nextBtn = document.getElementById('nextCardsBtn');
        if (prevBtn) prevBtn.disabled = (currentPageIdx === 0);
        if (nextBtn) nextBtn.disabled = (currentPageIdx >= totalPages - 1);
    }

    function bindCarouselButtons() {
        document.getElementById('prevCardsBtn')?.addEventListener('click', () => {
            if (currentPageIdx > 0) { currentPageIdx--; renderCards(); renderDots(); }
        });
        document.getElementById('nextCardsBtn')?.addEventListener('click', () => {
            const totalPages = Math.ceil(allCards.length / itemsPerPage);
            if (currentPageIdx < totalPages - 1) { currentPageIdx++; renderCards(); renderDots(); }
        });
    }

    // ---------------------------------------------------------------
    // زر الأدمن العائم لإدارة الأقسام
    // ---------------------------------------------------------------
    function ensureManageFab() {
        if (document.getElementById('manageCardsFab')) return;
        const fab = document.createElement('button');
        fab.id = 'manageCardsFab';
        fab.className = 'admin-fab-manage';
        fab.title = 'إدارة الأقسام';
        fab.innerHTML = '<i class="fas fa-sliders-h"></i>';
        fab.addEventListener('click', openManageList);
        document.body.appendChild(fab);
    }

    function updateAdminUI() {
        ensureManageFab();
        const fab = document.getElementById('manageCardsFab');
        if (fab) fab.classList.toggle('show', isAdminUser());
    }

    // ---------------------------------------------------------------
    // نافذة: قائمة إدارة كل الأقسام
    // ---------------------------------------------------------------
    function openManageList() {
        if (!isAdminUser()) return;
        const rows = allCards.map(card => `
            <div class="gb-manage-row">
                <div class="mini-icon">${iconOrImage(card)}</div>
                <div class="row-title">${escapeHtml(card.name)}</div>
                <div class="row-actions">
                    <button type="button" class="card-admin-btn edit" data-action="edit" data-id="${card.id}" title="تعديل"><i class="fas fa-pen"></i></button>
                    <button type="button" class="card-admin-btn del" data-action="del" data-id="${card.id}" title="حذف"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `).join('') || '<p style="color:var(--text-light);text-align:center;padding:20px 0;">لا توجد أقسام بعد</p>';

        openModal(`
            <h3><i class="fas fa-sliders-h"></i> إدارة أقسام الموقع</h3>
            <p class="gb-sub">أضف أو عدّل أو احذف أي قسم يظهر في «الدخول السريع» بالصفحة الرئيسية — يظهر التغيير للزوار مباشرة.</p>
            <div class="gb-cards-manage-list">${rows}</div>
            <div class="gb-actions">
                <button type="button" class="gb-btn gb-btn-primary" id="openAddFromList"><i class="fas fa-plus"></i> إضافة قسم جديد</button>
            </div>
        `);

        document.querySelectorAll('.gb-manage-row [data-action="edit"]').forEach(btn => {
            btn.addEventListener('click', () => openForm(btn.dataset.id));
        });
        document.querySelectorAll('.gb-manage-row [data-action="del"]').forEach(btn => {
            btn.addEventListener('click', () => confirmDelete(btn.dataset.id));
        });
        document.getElementById('openAddFromList')?.addEventListener('click', () => openForm(null));
    }

    // ---------------------------------------------------------------
    // نافذة: إضافة / تعديل قسم
    // ---------------------------------------------------------------
    function openForm(id) {
        if (!isAdminUser()) return;
        editingId = id;
        pendingImageUrl = null;
        const card = id ? allCards.find(c => c.id === id) : null;

        openModal(`
            <h3><i class="fas fa-layer-group"></i> ${card ? 'تعديل القسم' : 'إضافة قسم جديد'}</h3>
            <p class="gb-sub">هذا القسم سيظهر كبطاقة في «الدخول السريع» بالصفحة الرئيسية.</p>
            <div class="gb-form-group">
                <label>اسم القسم</label>
                <input type="text" id="fName" value="${card ? escapeHtml(card.name) : ''}" placeholder="مثال: كتب الفيزياء">
            </div>
            <div class="gb-form-group">
                <label>الوصف المختصر</label>
                <textarea id="fDesc" rows="2" placeholder="جملة قصيرة تشرح محتوى القسم">${card ? escapeHtml(card.desc) : ''}</textarea>
            </div>
            <div class="gb-form-group">
                <label>الرابط عند الضغط على البطاقة</label>
                <input type="text" id="fLink" value="${card ? escapeHtml(card.link) : ''}" placeholder="مثال: subjects.html أو رابط PDF/صورة">
            </div>
            <div class="gb-form-group">
                <label>نص الزر</label>
                <input type="text" id="fBadge" value="${card ? escapeHtml(card.badge) : 'تصفح الآن'}" placeholder="تصفح الآن">
            </div>
            <div class="gb-form-group">
                <label>أيقونة القسم (أو ارفع صورة بدلاً منها)</label>
                <div class="gb-icon-row">
                    <div class="gb-icon-preview" id="iconPreview">${card ? iconOrImage(card) : '<i class="fas fa-star"></i>'}</div>
                    <input type="text" id="fIcon" value="${card && !card.imageUrl ? escapeHtml(card.icon || '') : ''}" placeholder="fas fa-book" style="flex:1;">
                </div>
                <div class="gb-icon-suggestions">
                    ${ICON_SUGGESTIONS.map(ic => `<div class="gb-icon-chip" data-icon="${ic}" title="${ic}"><i class="${ic}"></i></div>`).join('')}
                </div>
                <div style="margin-top:12px;">
                    <button type="button" class="gb-upload-btn" id="uploadImgBtn"><i class="fas fa-upload"></i> رفع صورة كأيقونة (اختياري)</button>
                    <input type="file" id="fImageFile" accept="image/*" style="display:none;">
                    <div class="gb-upload-progress" id="uploadProgress"></div>
                </div>
            </div>
            <div class="gb-actions">
                <button type="button" class="gb-btn gb-btn-ghost" id="cancelFormBtn">إلغاء</button>
                <button type="button" class="gb-btn gb-btn-primary" id="saveCardBtn"><i class="fas fa-check"></i> حفظ</button>
            </div>
        `);

        if (card && card.imageUrl) pendingImageUrl = card.imageUrl;

        document.querySelectorAll('.gb-icon-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                document.getElementById('fIcon').value = chip.dataset.icon;
                pendingImageUrl = null;
                document.getElementById('iconPreview').innerHTML = `<i class="${chip.dataset.icon}"></i>`;
            });
        });
        document.getElementById('fIcon')?.addEventListener('input', (e) => {
            pendingImageUrl = null;
            document.getElementById('iconPreview').innerHTML = `<i class="${e.target.value || 'fas fa-star'}"></i>`;
        });

        document.getElementById('uploadImgBtn')?.addEventListener('click', () => document.getElementById('fImageFile').click());
        document.getElementById('fImageFile')?.addEventListener('change', handleImageUpload);
        document.getElementById('cancelFormBtn')?.addEventListener('click', closeModal);
        document.getElementById('saveCardBtn')?.addEventListener('click', saveCard);
    }

    function handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;
        if (typeof firebase === 'undefined' || !firebase.storage) {
            toast('تعذّر الوصول لخدمة رفع الملفات', 'error');
            return;
        }
        const progressEl = document.getElementById('uploadProgress');
        const storageRef = firebase.storage().ref(`homeCards/${Date.now()}_${file.name}`);
        const task = storageRef.put(file);
        progressEl.textContent = 'جاري الرفع... 0%';
        task.on('state_changed',
            (snap) => {
                const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
                progressEl.textContent = `جاري الرفع... ${pct}%`;
            },
            (err) => {
                console.error(err);
                progressEl.textContent = '';
                toast('فشل رفع الصورة', 'error');
            },
            async () => {
                pendingImageUrl = await task.snapshot.ref.getDownloadURL();
                progressEl.textContent = 'تم الرفع بنجاح ✓';
                document.getElementById('iconPreview').innerHTML = `<img src="${pendingImageUrl}">`;
            }
        );
    }

    async function saveCard() {
        const name = document.getElementById('fName').value.trim();
        const desc = document.getElementById('fDesc').value.trim();
        const link = document.getElementById('fLink').value.trim();
        const badge = document.getElementById('fBadge').value.trim() || 'تصفح الآن';
        const icon = document.getElementById('fIcon').value.trim() || 'fas fa-star';

        if (!name || !link) {
            toast('يرجى إدخال اسم القسم والرابط على الأقل', 'error');
            return;
        }

        const data = { name, desc, link, badge, icon };

        try {
            if (editingId) {
                // في التعديل يمكن استخدام delete() لإزالة الصورة إن أزيلت
                data.imageUrl = pendingImageUrl ? pendingImageUrl : firebase.firestore.FieldValue.delete();
                await db.collection(COLLECTION).doc(editingId).update(data);
                toast('تم تحديث القسم بنجاح', 'success');
            } else {
                // عند الإضافة: أضف الحقل فقط إن وجدت صورة، بدون delete()
                if (pendingImageUrl) data.imageUrl = pendingImageUrl;
                data.order = allCards.length ? Math.max(...allCards.map(c => c.order || 0)) + 1 : 0;
                await db.collection(COLLECTION).add(data);
                toast('تمت إضافة القسم بنجاح', 'success');
            }
            closeModal();
        } catch (e) {
            console.error(e);
            toast('حدث خطأ أثناء الحفظ', 'error');
        }
    }

    function confirmDelete(id) {
        const card = allCards.find(c => c.id === id);
        openModal(`
            <h3><i class="fas fa-triangle-exclamation" style="color:#e63757;"></i> تأكيد الحذف</h3>
            <p class="gb-sub">هل تريد حذف قسم «${escapeHtml(card ? card.name : '')}»؟ سيختفي فوراً من الصفحة الرئيسية لكل الزوار.</p>
            <div class="gb-actions">
                <button type="button" class="gb-btn gb-btn-ghost" id="cancelDelBtn">إلغاء</button>
                <button type="button" class="gb-btn gb-btn-danger" id="confirmDelBtn"><i class="fas fa-trash"></i> حذف نهائياً</button>
            </div>
        `);
        document.getElementById('cancelDelBtn')?.addEventListener('click', closeModal);
        document.getElementById('confirmDelBtn')?.addEventListener('click', async () => {
            try {
                await db.collection(COLLECTION).doc(id).delete();
                toast('تم حذف القسم', 'success');
                closeModal();
            } catch (e) {
                console.error(e);
                toast('تعذّر حذف القسم', 'error');
            }
        });
    }

    // ---------------------------------------------------------------
    // نافذة عامة (Modal) بسيطة قابلة لإعادة الاستخدام
    // ---------------------------------------------------------------
    function openModal(innerHtml) {
        closeModal();
        const overlay = document.createElement('div');
        overlay.className = 'gb-modal-overlay';
        overlay.id = 'gbModalOverlay';
        overlay.innerHTML = `<div class="gb-modal"><button type="button" class="gb-close" id="gbCloseBtn">&times;</button>${innerHtml}</div>`;
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
        document.getElementById('gbCloseBtn').addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
    }

    function closeModal() {
        const overlay = document.getElementById('gbModalOverlay');
        if (overlay) { overlay.remove(); document.body.style.overflow = 'auto'; }
    }

    // ---------------------------------------------------------------
    // تشغيل
    // ---------------------------------------------------------------
    function init() {
        listen();
        bindCarouselButtons();
        function hookAuth() {
            if (typeof auth === 'undefined') { setTimeout(hookAuth, 300); return; }
            auth.onAuthStateChanged(() => { renderCards(); renderDots(); updateAdminUI(); });
        }
        hookAuth();
    }

    window.GBCards = { init };
})();