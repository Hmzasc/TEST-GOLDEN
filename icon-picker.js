// ============================================================
// منتقي الأيقونات المرئي (Icon Picker)
// يبحث عن كل عنصر بصنف .icon-picker في الصفحة، ويبني له:
//  - زر معاينة يظهر الأيقونة الحالية
//  - لوحة منبثقة (Popover) بها شبكة أيقونات قابلة للنقر
// ويخزّن القيمة المختارة داخل حقل input مخفي (hidden) بنفس
// الـ id المحدد في data-input-id، حتى يبقى باقي الكود يعمل
// دون أي تغيير (يقرأ .value من نفس الحقل كالمعتاد).
// ============================================================
(function() {
  // قائمة أيقونات منتقاة ومناسبة لموقع تعليمي (مواد دراسية + نصائح)
  const ICONS = [
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
  
  function buildPicker(root) {
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
    
    ICONS.forEach(iconClass => {
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
  
  function initAllPickers() {
    document.querySelectorAll('.icon-picker').forEach(buildPicker);
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllPickers);
  } else {
    initAllPickers();
  }
})();