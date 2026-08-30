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
  
  // ============================================================
  // منتقي الأيقونات — مدمج هنا مباشرة (وليس في ملف icon-picker.js
  // منفصل) حتى لا تعتمد هذه الميزة الحرجة على نجاح تحميل ملف خارجي
  // إضافي. يعمل بمجرد نجاح تحميل admin-widget.js نفسه.
  // ============================================================
  const ICON_CHOICES = [
    'fa-book', 'fa-book-open', 'fa-graduation-cap', 'fa-user-graduate',
    'fa-chalkboard-teacher', 'fa-chalkboard', 'fa-pencil-alt', 'fa-pen',
    'fa-calculator', 'fa-square-root-alt', 'fa-infinity', 'fa-superscript',
    'fa-flask', 'fa-atom', 'fa-dna', 'fa-microscope',
    'fa-globe', 'fa-globe-africa', 'fa-map', 'fa-map-marked-alt',
    'fa-language', 'fa-comment', 'fa-comments', 'fa-spell-check',
    'fa-landmark', 'fa-university', 'fa-mosque', 'fa-book-quran',
    'fa-chart-line', 'fa-chart-bar', 'fa-clipboard-list', 'fa-tasks',
    'fa-lightbulb', 'fa-brain', 'fa-puzzle-piece', 'fa-question-circle',
    'fa-clock', 'fa-calendar-alt', 'fa-hourglass-half', 'fa-stopwatch',
    'fa-star', 'fa-medal', 'fa-trophy', 'fa-award',
    'fa-heart', 'fa-thumbs-up', 'fa-hand-holding-heart', 'fa-fire',
    'fa-leaf', 'fa-sun', 'fa-moon', 'fa-cloud',
    'fa-laptop-code', 'fa-code', 'fa-desktop', 'fa-mobile-alt',
    'fa-palette', 'fa-music', 'fa-camera', 'fa-film',
    'fa-running', 'fa-dumbbell', 'fa-futbol', 'fa-basketball-ball',
    'fa-bullseye', 'fa-compass', 'fa-flag', 'fa-balance-scale',
    'fa-briefcase', 'fa-file-alt', 'fa-folder-open', 'fa-envelope'
  ];
  
  function buildIconPicker(root) {
    // تجنّب البناء المزدوج لو تم استدعاء الدالة أكثر من مرة على نفس العنصر
    if (root.dataset.iconPickerBuilt === '1') return;
    root.dataset.iconPickerBuilt = '1';
    
    const inputId = root.getAttribute('data-input-id');
    const defaultIcon = root.getAttribute('data-default') || 'fa-book';
    let hiddenInput = document.getElementById(inputId);
    
    if (!hiddenInput) {
      hiddenInput = document.createElement('input');
      hiddenInput.type = 'hidden';
      hiddenInput.id = inputId;
      hiddenInput.value = defaultIcon;
      root.appendChild(hiddenInput);
    }
    if (!hiddenInput.value) hiddenInput.value = defaultIcon;
    
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'icon-picker-trigger';
    trigger.innerHTML = `<i class="fas ${hiddenInput.value}"></i> <span>اختر أيقونة</span> <i class="fas fa-chevron-down trigger-arrow"></i>`;
    
    const panel = document.createElement('div');
    panel.className = 'icon-picker-panel';
    const grid = document.createElement('div');
    grid.className = 'icon-picker-grid';
    
    ICON_CHOICES.forEach(iconClass => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'icon-picker-item';
      if (iconClass === hiddenInput.value) item.classList.add('selected');
      item.setAttribute('data-icon', iconClass);
      item.setAttribute('title', iconClass);
      item.innerHTML = `<i class="fas ${iconClass}"></i>`;
      item.addEventListener('click', () => {
        hiddenInput.value = iconClass;
        trigger.querySelector('i').className = `fas ${iconClass}`;
        grid.querySelectorAll('.icon-picker-item').forEach(el => el.classList.remove('selected'));
        item.classList.add('selected');
        panel.classList.remove('open');
      });
      grid.appendChild(item);
    });
    
    panel.appendChild(grid);
    
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = panel.classList.contains('open');
      document.querySelectorAll('.icon-picker-panel.open').forEach(p => p.classList.remove('open'));
      if (!isOpen) panel.classList.add('open');
    });
    
    root.appendChild(trigger);
    root.appendChild(panel);
  }
  
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.icon-picker')) {
      document.querySelectorAll('.icon-picker-panel.open').forEach(p => p.classList.remove('open'));
    }
  });
  
  function initAllIconPickersInternal() {
    document.querySelectorAll('.icon-picker').forEach(buildIconPicker);
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
      // نبني منتقي الأيقونات دائماً من الداخل (مضمون 100% لأنه جزء
      // من نفس هذا الملف الذي أثبتنا أنه يعمل)، بدل الاعتماد على
      // نجاح تحميل ملف icon-picker.js الخارجي المنفصل
      initAllIconPickersInternal();
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
