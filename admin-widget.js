// ============================================================
// أيقونة/لوحة الإضافة العائمة المشتركة — تظهر في كل صفحة تحمّل
// هذا الملف، لكن محتوى اللوحة يختلف حسب الصفحة نفسها.
//
// كل صفحة تسجّل محتواها الخاص عبر:
//   window.getAdminPanelHTML = function () { return `...HTML...`; };
//   window.bindAdminPanelEvents = function () { /* ربط الأزرار */ };
//
// وتستمع لحدث "admin:statechange" (يُطلق عند تسجيل الدخول/الخروج)
// لإعادة رسم عناصرها الخاصة (مثل إظهار/إخفاء أزرار الحذف).
//
// يعتمد على وجود db و auth و showToast و showSpinner و hideSpinner
// مُعرّفة مسبقاً في الصفحة (نفس ما تعتمد عليه comments.js).
// ============================================================
(function() {
  const ADMIN_EMAIL = 'centergolden04@gmail.com';
  let fab, overlay, bodyEl, statusEl;
  
  function isAdminNow() {
    return !!(typeof auth !== 'undefined' && auth.currentUser && auth.currentUser.email === ADMIN_EMAIL);
  }
  
  function toast(msg, type) {
    if (typeof showToast === 'function') showToast(msg, type);
  }
  
  function buildUI() {
    fab = document.createElement('button');
    fab.className = 'admin-fab';
    fab.id = 'adminWidgetFab';
    fab.setAttribute('aria-label', 'لوحة الإضافة');
    fab.innerHTML = '<i class="fas fa-user-shield"></i>';
    document.body.appendChild(fab);
    
    overlay = document.createElement('div');
    overlay.className = 'admin-modal-overlay';
    overlay.id = 'adminWidgetOverlay';
    overlay.innerHTML = `
            <div class="admin-modal">
                <div class="admin-modal-header">
                    <h2><i class="fas fa-crown"></i> لوحة الإضافة السريعة</h2>
                    <button class="admin-modal-close" id="adminWidgetClose"><i class="fas fa-times"></i></button>
                </div>
                <div id="adminWidgetStatus"></div>
                <div id="adminWidgetBody" class="admin-panel active"></div>
            </div>
        `;
    document.body.appendChild(overlay);
    bodyEl = overlay.querySelector('#adminWidgetBody');
    statusEl = overlay.querySelector('#adminWidgetStatus');
    
    fab.addEventListener('click', () => {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      renderBody();
    });
    overlay.querySelector('#adminWidgetClose').addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  }
  
  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
  
  function renderLoginForm() {
    statusEl.innerHTML = '';
    bodyEl.innerHTML = `
            <div class="admin-login-form">
                <p style="color:var(--text-light);margin-bottom:16px;">🔐 يرجى إدخال كلمة المرور للوصول إلى لوحة التحكم</p>
                <div class="form-group"><i class="fas fa-lock"></i><input type="password" id="adminWidgetPassword" placeholder="كلمة المرور" /></div>
                <button class="btn-submit" id="adminWidgetLoginBtn"><i class="fas fa-sign-in-alt"></i> تسجيل الدخول</button>
            </div>
        `;
    const pwInput = document.getElementById('adminWidgetPassword');
    const loginBtn = document.getElementById('adminWidgetLoginBtn');
    
    async function doLogin() {
      const pass = pwInput.value.trim();
      if (!pass) { toast('يرجى إدخال كلمة المرور', 'warning'); return; }
      if (typeof showSpinner === 'function') showSpinner('جاري تسجيل الدخول...');
      try {
        await auth.signInWithEmailAndPassword(ADMIN_EMAIL, pass);
        toast('مرحباً أيها المسؤول', 'success');
      } catch (e) {
        console.error('Auth error:', e.code, e.message);
        toast('كلمة المرور غير صحيحة', 'error');
      }
      if (typeof hideSpinner === 'function') hideSpinner();
    }
    loginBtn.addEventListener('click', doLogin);
    pwInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') doLogin(); });
  }
  
  function renderLoggedInPanel() {
    statusEl.innerHTML = `
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;padding:12px 16px;background:rgba(46,204,113,0.1);border-radius:var(--radius-sm);border-right:4px solid #2ecc71;">
                <i class="fas fa-check-circle" style="color:#2ecc71;font-size:1.2rem;"></i>
                <span style="font-weight:600;">مرحباً أيها المسؤول</span>
                <button class="btn-danger" id="adminWidgetLogoutBtn" style="margin-right:auto;padding:4px 14px;font-size:0.8rem;">تسجيل الخروج</button>
            </div>
        `;
    document.getElementById('adminWidgetLogoutBtn').addEventListener('click', async () => {
      await auth.signOut();
      toast('تم تسجيل الخروج', 'info');
    });
    
    if (typeof window.getAdminPanelHTML === 'function') {
      bodyEl.innerHTML = window.getAdminPanelHTML();
      if (typeof window.bindAdminPanelEvents === 'function') window.bindAdminPanelEvents();
      if (typeof window.initAllIconPickers === 'function') window.initAllIconPickers();
    } else {
      bodyEl.innerHTML = `
                <div style="text-align:center; padding:20px; color:var(--text-light);">
                    <i class="fas fa-info-circle" style="font-size:2rem; opacity:0.5; display:block; margin-bottom:10px;"></i>
                    <p>لا يوجد شيء قابل للإضافة من هذه الصفحة.</p>
                </div>`;
    }
  }
  
  function renderBody() {
    if (isAdminNow()) renderLoggedInPanel();
    else renderLoginForm();
  }
  
  function updateFabAppearance() {
    if (!fab) return;
    if (isAdminNow()) {
      fab.classList.add('logged');
      fab.innerHTML = '<i class="fas fa-check-circle"></i>';
    } else {
      fab.classList.remove('logged');
      fab.innerHTML = '<i class="fas fa-user-shield"></i>';
    }
    fab.classList.add('show');
  }
  
  function init() {
    buildUI();
    updateFabAppearance();
    if (typeof auth !== 'undefined') {
      auth.onAuthStateChanged(() => {
        updateFabAppearance();
        if (overlay.classList.contains('active')) renderBody();
        document.dispatchEvent(new CustomEvent('admin:statechange', { detail: { isAdmin: isAdminNow() } }));
      });
    }
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  window.closeAdminWidget = closeModal;
})();