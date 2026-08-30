// ============================================================
// عارض PDF مشترك — يُستخدم في أي صفحة تحوي نفس هيكل المودال:
// #pdfModal, #pdfTitle, #pdfCloseBtn, #pdf-canvas, #pdfLoading,
// #prevPageBtn, #nextPageBtn, #currentPage, #totalPages,
// #rotateLeftBtn, #rotateRightBtn, #zoomOutBtn, #zoomInBtn,
// #pdfDownload
//
// يتطلب تحميل مكتبة pdf.js في الصفحة قبل هذا الملف:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
// ============================================================
(function() {
  if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }
  
  let currentPdf = null;
  let currentPageNum = 1;
  let currentScale = 1.2;
  let currentRotation = 0;
  
  function els() {
    return {
      modal: document.getElementById('pdfModal'),
      title: document.getElementById('pdfTitle'),
      closeBtn: document.getElementById('pdfCloseBtn'),
      canvas: document.getElementById('pdf-canvas'),
      loading: document.getElementById('pdfLoading'),
      prevBtn: document.getElementById('prevPageBtn'),
      nextBtn: document.getElementById('nextPageBtn'),
      currentPageEl: document.getElementById('currentPage'),
      totalPagesEl: document.getElementById('totalPages'),
      rotateLeftBtn: document.getElementById('rotateLeftBtn'),
      rotateRightBtn: document.getElementById('rotateRightBtn'),
      zoomOutBtn: document.getElementById('zoomOutBtn'),
      zoomInBtn: document.getElementById('zoomInBtn'),
      downloadLink: document.getElementById('pdfDownload')
    };
  }
  
  async function renderCurrentPage() {
    const { canvas, loading } = els();
    if (!currentPdf || !canvas) return;
    if (loading) loading.style.display = 'flex';
    try {
      const page = await currentPdf.getPage(currentPageNum);
      const viewport = page.getViewport({ scale: currentScale, rotation: currentRotation });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
    } catch (e) {
      console.error('PDF render error:', e);
    }
    if (loading) loading.style.display = 'none';
  }
  
  async function openPDFViewer(url, title) {
    const e = els();
    if (!e.modal) {
      // احتياط: لو الصفحة لا تحوي مودال العرض، افتح الملف في تبويب جديد مباشرة
      window.open(url, '_blank');
      return;
    }
    if (typeof pdfjsLib === 'undefined') {
      console.warn('pdf.js غير محمّل، سيتم فتح الملف مباشرة');
      window.open(url, '_blank');
      return;
    }
    
    e.modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    if (e.title) e.title.textContent = title || 'عرض الملف';
    if (e.downloadLink) {
      e.downloadLink.href = url;
      e.downloadLink.setAttribute('download', (title || 'ملف') + '.pdf');
    }
    currentPageNum = 1;
    currentScale = 1.2;
    currentRotation = 0;
    
    if (e.loading) e.loading.style.display = 'flex';
    try {
      currentPdf = await pdfjsLib.getDocument(url).promise;
      if (e.totalPagesEl) e.totalPagesEl.textContent = currentPdf.numPages;
      if (e.currentPageEl) e.currentPageEl.textContent = currentPageNum;
      await renderCurrentPage();
    } catch (err) {
      console.error('PDF load error:', err);
      if (e.loading) {
        e.loading.innerHTML = '<p>تعذّر تحميل الملف. حاول مرة أخرى أو نزّله مباشرة.</p>';
        e.loading.style.display = 'flex';
      }
    }
  }
  
  function closePDFViewer() {
    const e = els();
    if (e.modal) e.modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    currentPdf = null;
  }
  
  function bindEvents() {
    const e = els();
    if (!e.modal) return;
    
    if (e.closeBtn) e.closeBtn.addEventListener('click', closePDFViewer);
    e.modal.addEventListener('click', (ev) => {
      if (ev.target === e.modal) closePDFViewer();
    });
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape' && e.modal.classList.contains('show')) closePDFViewer();
    });
    
    if (e.prevBtn) e.prevBtn.addEventListener('click', () => {
      if (currentPageNum > 1) {
        currentPageNum--;
        if (e.currentPageEl) e.currentPageEl.textContent = currentPageNum;
        renderCurrentPage();
      }
    });
    if (e.nextBtn) e.nextBtn.addEventListener('click', () => {
      if (currentPdf && currentPageNum < currentPdf.numPages) {
        currentPageNum++;
        if (e.currentPageEl) e.currentPageEl.textContent = currentPageNum;
        renderCurrentPage();
      }
    });
    if (e.zoomInBtn) e.zoomInBtn.addEventListener('click', () => {
      currentScale = Math.min(currentScale + 0.2, 3);
      renderCurrentPage();
    });
    if (e.zoomOutBtn) e.zoomOutBtn.addEventListener('click', () => {
      currentScale = Math.max(currentScale - 0.2, 0.4);
      renderCurrentPage();
    });
    if (e.rotateLeftBtn) e.rotateLeftBtn.addEventListener('click', () => {
      currentRotation = (currentRotation - 90 + 360) % 360;
      renderCurrentPage();
    });
    if (e.rotateRightBtn) e.rotateRightBtn.addEventListener('click', () => {
      currentRotation = (currentRotation + 90) % 360;
      renderCurrentPage();
    });
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindEvents);
  } else {
    bindEvents();
  }
  
  window.openPDFViewer = openPDFViewer;
  window.closePDFViewer = closePDFViewer;
})();