// البيانات الأساسية للمواد والموارد
const subjectsData = [
    {
        id: 1,
        name: "اللغة العربية",
        icon: "fas fa-book",
        description: "كتب ومراجع اللغة العربية للبكالوريا",
        books: [
            { name: "الكتاب المدرسي كامل", year: "2025", link: "2025_arabic_book.pdf" },
            { name: "ملخص قواعد اللغة العربية", year: "2024", link: "2024 AR.pdf" },
            { name: "نماذج التعبير والإنشاء", year: "2023", link: "2023_arabic_writing.pdf" }
        ],
        exams: [
            { name: "امتحان 2024", link: "bacsD/Arabic/AR 2024.pdf" },
            { name: "امتحان 2023", link: "bacsD/Arabic/AR 2023.pdf" },
            { name: "امتحان 2022", link: "bacsD/Arabic/AR 2023.pdf" }
        ]
    },
    {
        id: 2,
        name: "اللغة الإنجليزية",
        icon: "fas fa-language",
        description: "كتب ومراجع اللغة الإنجليزية للبكالوريا",
        books: [
            { name: "English Textbook Full", year: "2025", link: "2025_english_book.pdf" },
            { name: "Grammar Summary", year: "2024", link: "2024_english_grammar.pdf" },
            { name: "Writing Models", year: "2023", link: "2023_english_writing.pdf" }
        ],
        exams: [
            { name: "امتحان 2024", link: "bacsD/English/Bac 2024 EN.pdf" },
            { name: "امتحان 2023", link: "bacsD/English/Bac 2023 EN.pdf" },
            { name: "امتحان 2022", link: "bacsD/English/Bac 2022 EN.pdf" }
        ]
    },
    {
        id: 3,
        name: "اللغة الفرنسية",
        icon: "fas fa-font",
        description: "كتب ومراجع اللغة الفرنسية للبكالوريا",
        books: [
            { name: "Livre Complet", year: "2025", link: "2025_french_book.pdf" },
            { name: "Grammaire Française", year: "2024", link: "2024_french_grammar.pdf" },
            { name: "Modèles de Rédaction", year: "2023", link: "2023_french_writing.pdf" }
        ],
        exams: [
            { name: "امتحان 2024", link: "bacsD/France/Bac 2024 FR.pdf" },
            { name: "امتحان 2023", link: "bacsD/France/Bac 2023 FR.pdf" },
            { name: "امتحان 2022", link: "bacsD/France/Bac 2022 FR.pdf" }
        ]
    },
    {
        id: 4,
        name: "التربية الإسلامية",
        icon: "fas fa-mosque",
        description: "كتب ومراجع التربية الإسلامية للبكالوريا",
        books: [
            { name: "الكتاب المدرسي كامل", year: "2025", link: "2025_islamic_book.pdf" },
            { name: "ملخص أحكام الفقه", year: "2024", link: "2024_islamic_fiqh.pdf" },
            { name: "سيرة الرسول صلى الله عليه وسلم", year: "2023", link: "2023_islamic_seerah.pdf" }
        ],
        exams: [
            { name: "امتحان 2024", link: "bacsD/Islamic/2024 IR.pdf" },
            { name: "امتحان 2023", link: "bacsD/Islamic/2023 IR.pdf" },
            { name: "امتحان 2022", link: "bacsD/Islamic/2022 IR.pdf" }
        ]
    },
    {
        id: 5,
        name: "Mathématiques",
        icon: "fas fa-calculator",
        description: "كتب ومراجع الرياضيات للبكالوريا",
        books: [
            { name: "Livre de Mathématiques", year: "2025", link: "2025_math_book.pdf" },
            { name: "Exercices Résolus", year: "2024", link: "2024_math_exercises.pdf" },
            { name: "Formules et Théorèmes", year: "2023", link: "2023_math_formulas.pdf" }
        ],
        exams: [
            { name: "امتحان 2024", link: "bacsD/Mathématiques/Bac D 2024 M sn.pdf" },
            { name: "امتحان 2023", link: "bacsD/Mathématiques/Bac D 2023 M sn.pdf" },
            { name: "امتحان 2022", link: "bacsD/Mathématiques/Bac D 2022 M sn.pdf" }
        ]
    },
    {
        id: 6,
        name: "Sciences Naturelles",
        icon: "fas fa-leaf",
        description: "كتب ومراجع العلوم الطبيعية للبكالوريا",
        books: [
            { name: "Livre de SN", year: "2025", link: "2025_science_book.pdf" },
            { name: "Résumés des Cours", year: "2024", link: "2024_science_summary.pdf" },
            { name: "Exercices Corrigés", year: "2023", link: "2023_science_exercises.pdf" }
        ],
        exams: [
            { name: "امتحان 2024", link: "bacsD/Sciences/Bac D SN 2024 sn.pdf" },
            { name: "امتحان 2023", link: "bacsD/Sciences/Bac D SN 2023 sn.pdf" },
            { name: "امتحان 2022", link: "bacsD/Sciences/Bac D SN 2022 sn.pdf" }
        ]
    },
    {
        id: 7,
        name: "Physique et Chimie",
        icon: "fas fa-flask",
        description: "كتب ومراجع الفيزياء والكيمياء للبكالوريا",
        books: [
            { name: "Livre de PC", year: "2025", link: "2025_physics_book.pdf" },
            { name: "Expériences et TP", year: "2024", link: "2024_physics_experiments.pdf" },
            { name: "Problèmes Résolus", year: "2023", link: "2023_physics_problems.pdf" }
        ],
        exams: [
            { name: "امتحان 2024", link: "bacsD/physique/Bac D PC 2024 sn.pd" },
            { name: "امتحان 2023", link: "bacsD/physique/Bac D PC 2023 sn.pd" },
            { name: "امتحان 2022", link: "bacsD/physique/Bac D PC 2022 sn.pd" }
        ]
    }
];

// المتغيرات العامة
let pdfDoc = null;
let currentPage = 1;
let pageRendering = false;
let pageNumPending = null;
let scale = 1.0;
let currentPdfUrl = '';
let currentPdfTitle = '';
let countdownInterval;
let rotationAngle = 0;

// رابط صورة الشعار - تأكد من وضع الصورة في مجلد الموقع
const WATERMARK_LOGO_URL = 'golden_watermark.png';

// ============================
// دوال مساعدة
// ============================

// دالة لاستخراج اسم الملف من الرابط
function extractFilename(url, defaultName = 'ملف_من_golden_bac.pdf') {
    if (!url || url === '#') return defaultName;
    
    try {
        // إزالة query parameters
        const cleanUrl = url.split('?')[0];
        
        // استخراج اسم الملف
        let filename = cleanUrl.split('/').pop();
        
        // إذا كان فارغاً أو file.pdf
        if (!filename || filename === 'file.pdf') {
            return defaultName;
        }
        
        // إضافة .pdf إذا لم يكن موجوداً
        if (!filename.toLowerCase().endsWith('.pdf')) {
            filename += '.pdf';
        }
        
        return filename;
    } catch {
        return defaultName;
    }
}

// ============================
// دوال إضافة الشعار إلى PDF
// ============================

// دالة لإضافة الشعار إلى ملف PDF
async function addWatermarkToPDF(pdfBytes) {
    try {
        // تحقق من وجود مكتبة PDFLib
        if (typeof PDFLib === 'undefined') {
            console.log('مكتبة PDFLib غير محملة، جاري التنزيل بدون شعار');
            return pdfBytes;
        }
        
        const { PDFDocument } = PDFLib;
        
        // تحميل PDF الأصلي
        const pdfDoc = await PDFDocument.load(pdfBytes);
        
        // محاولة تحميل صورة الشعار
        let logoImage = null;
        try {
            const logoResponse = await fetch(WATERMARK_LOGO_URL);
            if (logoResponse.ok) {
                const logoBytes = await logoResponse.arrayBuffer();
                logoImage = await pdfDoc.embedPng(logoBytes);
            }
        } catch (logoError) {
            console.log('لم يتم العثور على صورة الشعار:', logoError);
        }
        
        // إذا تم تحميل الشعار، أضفه إلى جميع الصفحات
        if (logoImage) {
            const pages = pdfDoc.getPages();
            
            pages.forEach(page => {
                const { width, height } = page.getSize();
                
                // إضافة الشعار في الزاوية السفلية اليسرى مع شفافية
                page.drawImage(logoImage, {
                    x: 20,
                    y: 40,
                    width: 100,
                    height: 100,
                    opacity: 0.9
                });
                
                // إضافة نص حقوق النشر
                page.drawText('https://golden-bac.vercel.app/', {
                    x: 100,
                    y: 15,
                    size: 10,
                    color: PDFLib.rgb(0.3, 0.3, 0.3),
                    opacity: 0.5
                });
            });
        }
        
        // حفظ PDF مع التعديلات
        const modifiedPdfBytes = await pdfDoc.save();
        return modifiedPdfBytes;
        
    } catch (error) {
        console.error('خطأ في إضافة الشعار:', error);
        return pdfBytes;
    }
}

// دالة تنزيل أساسية بسيطة
async function downloadFile(url, filename = null) {
    return new Promise(async (resolve, reject) => {
        try {
            // استخراج اسم الملف من الرابط إذا لم يتم توفيره
            const finalFilename = filename || extractFilename(url);
            
            console.log(`بدء تنزيل: ${url} باسم: ${finalFilename}`);
            
            // تحميل الملف الأصلي
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`خطأ HTTP: ${response.status}`);
            }
            
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            
            // إنشاء رابط التنزيل
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = finalFilename;
            link.style.display = 'none';
            
            // إضافة الرابط للنقر
            document.body.appendChild(link);
            link.click();
            
            // تنظيف
            setTimeout(() => {
                document.body.removeChild(link);
                URL.revokeObjectURL(blobUrl);
                resolve(true);
            }, 100);
            
        } catch (error) {
            console.error('فشل التنزيل:', error);
            reject(error);
        }
    });
}

// دالة تنزيل مع شعار
async function downloadWithWatermark(url, filename = null) {
    showSpinner('جاري التنزيل...');
    
    try {
        // استخراج اسم الملف
        const finalFilename = filename || extractFilename(url);
        
        // تحميل الملف
        const response = await fetch(url);
        if (!response.ok) throw new Error('فشل تحميل الملف');
        
        const pdfBytes = await response.arrayBuffer();
        
        // محاولة إضافة الشعار
        try {
            const watermarkedBytes = await addWatermarkToPDF(pdfBytes);
            
            // تنزيل النسخة مع الشعار
            const blob = new Blob([watermarkedBytes], { type: 'application/pdf' });
            const blobUrl = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = finalFilename;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            
            // تنظيف
            setTimeout(() => {
                document.body.removeChild(link);
                URL.revokeObjectURL(blobUrl);
            }, 1000);
            
            hideSpinner();
            showSpinner(`✅ تم تنزيل "${finalFilename}"`);
            setTimeout(hideSpinner, 1500);
            
        } catch (watermarkError) {
            console.log('فشل إضافة الشعار، جاري التنزيل العادي:', watermarkError);
            // إذا فشلت إضافة الشعار، ننزل الملف العادي
            await downloadFile(url, finalFilename);
            hideSpinner();
            showSpinner(`✅ تم تنزيل "${finalFilename}" (بدون شعار)`);
            setTimeout(hideSpinner, 1500);
        }
        
    } catch (error) {
        console.error('خطأ في التنزيل:', error);
        hideSpinner();
        showSpinner('❌ فشل تنزيل الملف');
        setTimeout(hideSpinner, 2000);
    }
}

// ============================
// نظام بسيط للتنزيل (السبب الرئيسي للمشكلة)
// ============================

// دالة تنزيل رئيسية تعمل كل مرة
function handleDownload(event) {
    // منع السلوك الافتراضي
    event.preventDefault();
    event.stopPropagation();
    
    // الحصول على الرابط
    const button = event.currentTarget;
    const url = button.getAttribute('href') || button.getAttribute('data-url');
    
    if (!url || url === '#') {
        showSpinner('❌ رابط الملف غير صحيح');
        setTimeout(hideSpinner, 2000);
        return;
    }
    
    // الحصول على اسم الملف
    let filename = button.getAttribute('download') || 
                   button.getAttribute('data-filename') || 
                   button.getAttribute('data-name');
    
    // تنزيل الملف
    downloadWithWatermark(url, filename);
}

// ============================
// دوال PDF الأساسية
// ============================

function loadPDF(url) {
    if (!window.pdfjsLib) {
        console.error('PDF.js library not loaded');
        const pdfLoading = document.getElementById('pdfLoading');
        if (pdfLoading) {
            pdfLoading.innerHTML = `
                <div style="color: #e74c3c; text-align: center;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 2.5rem; margin-bottom: 15px;"></i>
                    <p>عذراً، لم يتم تحميل مكتبة PDF</p>
                    <button onclick="closePDFViewer()" class="download-btn" style="margin-top: 15px;">
                        <i class="fas fa-times"></i> إغلاق
                    </button>
                </div>
            `;
        }
        return;
    }
    
    rotationAngle = 0;
    
    window.pdfjsLib.getDocument({
        url: url,
        cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/',
        cMapPacked: true,
    }).promise.then(function(pdf) {
        pdfDoc = pdf;
        const totalPagesEl = document.getElementById('totalPages');
        if (totalPagesEl) totalPagesEl.textContent = pdf.numPages;
        
        renderPage(currentPage);
        updateNavigationButtons();
        
    }).catch(function(error) {
        console.error('Error loading PDF:', error);
        const pdfLoading = document.getElementById('pdfLoading');
        if (pdfLoading) {
            pdfLoading.innerHTML = `
                <div style="color: #e74c3c; text-align: center;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 2.5rem; margin-bottom: 15px;"></i>
                    <p>عذراً، حدث خطأ في تحميل الملف</p>
                    <div style="margin-top: 15px; display: flex; gap: 10px; justify-content: center;">
                        <button onclick="triggerDownload('${url}', '${currentPdfTitle}.pdf')" class="download-btn">
                            <i class="fas fa-download"></i> محاولة التنزيل
                        </button>
                        <button onclick="closePDFViewer()" class="view-pdf-btn" style="background: #e74c3c;">
                            <i class="fas fa-times"></i> إغلاق
                        </button>
                    </div>
                </div>
            `;
        }
    });
}

function renderPage(num) {
    if (!pdfDoc) return;
    
    pageRendering = true;
    const pdfCanvas = document.getElementById('pdf-canvas');
    const pdfLoading = document.getElementById('pdfLoading');
    
    if (!pdfCanvas || !pdfLoading) return;
    
    pdfDoc.getPage(num).then(function(page) {
        const pageRotation = page.rotate;
        const viewport = page.getViewport({
            scale: scale,
            rotation: pageRotation + rotationAngle
        });
        
        const context = pdfCanvas.getContext('2d');
        
        pdfCanvas.height = viewport.height;
        pdfCanvas.width = viewport.width;
        
        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        
        context.clearRect(0, 0, pdfCanvas.width, pdfCanvas.height);
        
        const renderTask = page.render(renderContext);
        
        renderTask.promise.then(function() {
            pageRendering = false;
            pdfLoading.style.display = 'none';
            pdfCanvas.style.display = 'block';
            
            if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
            }
        });
    });
    
    const currentPageEl = document.getElementById('currentPage');
    if (currentPageEl) currentPageEl.textContent = num;
}

// دوال التدوير
function rotateLeft() {
    rotationAngle -= 90;
    if (rotationAngle < 0) rotationAngle = 270;
    renderPage(currentPage);
}

function rotateRight() {
    rotationAngle += 90;
    if (rotationAngle >= 360) rotationAngle = 0;
    renderPage(currentPage);
}

function resetRotation() {
    rotationAngle = 0;
    renderPage(currentPage);
}

// ============================
// دوال التحميل والواجهة
// ============================

function showSpinner(text = 'جاري التحميل...') {
    const spinnerOverlay = document.getElementById('spinnerOverlay');
    const spinnerText = document.getElementById('spinnerText');
    
    if (spinnerOverlay && spinnerText) {
        spinnerText.textContent = text;
        spinnerOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            spinnerOverlay.style.opacity = '1';
        }, 10);
    }
}

function hideSpinner() {
    const spinnerOverlay = document.getElementById('spinnerOverlay');
    if (spinnerOverlay) {
        spinnerOverlay.style.opacity = '0';
        setTimeout(() => {
            spinnerOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

function createParticles() {
    const particlesContainer = document.getElementById('particlesContainer');
    if (!particlesContainer) return;
    
    particlesContainer.innerHTML = '';
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 8 + 4;
        const posX = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * 20 + 10;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        particlesContainer.appendChild(particle);
    }
}

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    
    const icon = this.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
    
    const themeToggleSidebarIcon = document.getElementById('themeToggleSidebar')?.querySelector('i');
    if (themeToggleSidebarIcon) {
        if (body.classList.contains('dark-mode')) {
            themeToggleSidebarIcon.classList.remove('fa-moon');
            themeToggleSidebarIcon.classList.add('fa-sun');
        } else {
            themeToggleSidebarIcon.classList.remove('fa-sun');
            themeToggleSidebarIcon.classList.add('fa-moon');
        }
    }
}

function handleScroll() {
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    }
    
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }
    
    const mainHeader = document.getElementById('mainHeader');
    if (mainHeader) {
        if (window.scrollY > 50) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    }
}

// ============================
// دوال العد التنازلي
// ============================

const bacDate = new Date('June 29, 2026 07:00:00').getTime();
const startDate = new Date('October 1, 2025 00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = bacDate - now;
    
    if (distance < 0) {
        clearInterval(countdownInterval);
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (daysElement) daysElement.textContent = days;
    if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
    if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
    if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
    
    const daysRing = document.querySelector('.days-ring');
    const hoursRing = document.querySelector('.hours-ring');
    const minutesRing = document.querySelector('.minutes-ring');
    const secondsRing = document.querySelector('.seconds-ring');
    
    if (daysRing) updateRingProgress(daysRing, days, 365);
    if (hoursRing) updateRingProgress(hoursRing, hours, 24);
    if (minutesRing) updateRingProgress(minutesRing, minutes, 60);
    if (secondsRing) updateRingProgress(secondsRing, seconds, 60);
    
    const totalDays = Math.floor((bacDate - startDate) / (1000 * 60 * 60 * 24));
    const daysPassed = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    const progressPercent = Math.min(100, Math.max(0, (daysPassed / totalDays) * 100));
    
    const progressFill = document.getElementById('progressFill');
    const progressPercentage = document.getElementById('progressPercentage');
    if (progressFill) progressFill.style.width = `${progressPercent}%`;
    if (progressPercentage) progressPercentage.textContent = `${Math.round(progressPercent)}%`;
}

function updateRingProgress(ring, value, max) {
    if (!ring) return;
    
    const circumference = 339;
    const progress = Math.min(1, value / max);
    const offset = circumference - (progress * circumference);
    ring.style.strokeDashoffset = offset;
}

function initCountdown() {
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

// ============================
// دوال المواد والموارد
// ============================

function initSubjects() {
    const subjectsGrid = document.getElementById('subjectsGrid');
    if (!subjectsGrid) return;
    
    subjectsGrid.innerHTML = '';
    subjectsData.forEach(subject => {
        const subjectCard = document.createElement('div');
        subjectCard.className = 'subject-card';
        subjectCard.innerHTML = `
            <div class="subject-icon">
                <i class="${subject.icon}"></i>
            </div>
            <div class="subject-content">
                <h3>${subject.name}</h3>
                <p>${subject.description}</p>
                <div>
                    <span class="resources-count">${subject.books.length + subject.exams.length} موارد</span>
                </div>
            </div>
        `;
        
        subjectCard.addEventListener('click', () => openResourcesModal(subject));
        subjectsGrid.appendChild(subjectCard);
    });
}

function openResourcesModal(subject) {
    showSpinner('جاري تحميل الموارد...');
    
    setTimeout(() => {
        const modalTitle = document.getElementById('modalTitle');
        const resourcesList = document.getElementById('resourcesList');
        const resourcesLoading = document.getElementById('resourcesLoading');
        
        if (modalTitle) modalTitle.textContent = `موارد ${subject.name}`;
        if (resourcesList) resourcesList.innerHTML = '';
        if (resourcesLoading) resourcesLoading.classList.add('active');
        
        if (resourcesList) {
            // إضافة الكتب
            const booksHeader = document.createElement('div');
            booksHeader.className = 'resource-item';
            booksHeader.style.background = 'transparent';
            booksHeader.style.boxShadow = 'none';
            booksHeader.innerHTML = `<h4 style="margin:0; color:var(--primary-color); font-size: 1.2rem;">📚 الكتب والمراجع</h4>`;
            resourcesList.appendChild(booksHeader);
            
            subject.books.forEach(book => {
                const bookElement = document.createElement('div');
                bookElement.className = 'resource-item';
                bookElement.innerHTML = `
                    <div class="resource-info">
                        <h4>${book.name}</h4>
                        <p>سنة ${book.year}</p>
                    </div>
                    <div style="display: flex; gap: 10px; align-items: center;">
                        <button class="view-pdf-btn" data-pdf="${book.link}" data-title="${book.name}">عرض</button>
                        <button class="download-btn" onclick="triggerDownload('${book.link}', '${book.name}.pdf')">تنزيل </button>
                    </div>
                `;
                resourcesList.appendChild(bookElement);
            });
            
            // إضافة الامتحانات
            const examsHeader = document.createElement('div');
            examsHeader.className = 'resource-item';
            examsHeader.style.background = 'transparent';
            examsHeader.style.boxShadow = 'none';
            examsHeader.innerHTML = `<h4 style="margin:0; color:var(--primary-color); font-size: 1.2rem; margin-top: 20px;">📝 امتحانات سابقة</h4>`;
            resourcesList.appendChild(examsHeader);
            
            subject.exams.forEach(exam => {
                const examElement = document.createElement('div');
                examElement.className = 'resource-item';
                examElement.innerHTML = `
                    <div class="resource-info">
                        <h4>${exam.name}</h4>
                        <p>امتحان ${subject.name}</p>
                    </div>
                    <div style="display: flex; gap: 10px; align-items: center;">
                        <button class="view-pdf-btn" data-pdf="${exam.link}" data-title="${exam.name}">عرض</button>
                        <button class="download-btn" onclick="triggerDownload('${exam.link}', '${exam.name}.pdf')">تنزيل </button>
                    </div>
                `;
                resourcesList.appendChild(examElement);
            });
        }
        
        const resourcesModal = document.getElementById('resourcesModal');
        if (resourcesModal) {
            resourcesModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
        
        if (resourcesLoading) {
            setTimeout(() => {
                resourcesLoading.classList.remove('active');
                hideSpinner();
            }, 500);
        }
    }, 800);
}

// ============================
// دوال عرض PDF
// ============================

function openPDFViewer(url, title) {
    showSpinner('جاري فتح الملف...');
    
    if (!url || url === '#') {
        hideSpinner();
        showSpinner('❌ رابط الملف غير صحيح');
        setTimeout(hideSpinner, 2000);
        return;
    }
    
    currentPdfUrl = url;
    currentPdfTitle = title;
    
    const resourcesModal = document.getElementById('resourcesModal');
    if (resourcesModal) resourcesModal.style.display = 'none';
    
    const pdfModal = document.getElementById('pdfModal');
    if (pdfModal) {
        pdfModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    pdfDoc = null;
    currentPage = 1;
    scale = 1.0;
    rotationAngle = 0;
    
    const pdfTitle = document.getElementById('pdfTitle');
    const currentPageEl = document.getElementById('currentPage');
    const totalPagesEl = document.getElementById('totalPages');
    const pdfDownloadBtn = document.getElementById('pdfDownload');
    const pdfLoading = document.getElementById('pdfLoading');
    const pdfCanvas = document.getElementById('pdf-canvas');
    
    if (pdfTitle) pdfTitle.textContent = title;
    if (currentPageEl) currentPageEl.textContent = '1';
    if (totalPagesEl) totalPagesEl.textContent = '...';
    if (pdfDownloadBtn) {
        pdfDownloadBtn.onclick = (e) => {
            e.preventDefault();
            const filename = extractFilename(url) || (title + '.pdf');
            downloadWithWatermark(url, filename);
        };
    }
    if (pdfLoading) {
        pdfLoading.style.display = 'flex';
    }
    if (pdfCanvas) {
        pdfCanvas.style.display = 'none';
    }
    
    setTimeout(() => {
        loadPDF(url);
        hideSpinner();
    }, 500);
}

function queueRenderPage(num) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
}

function onPrevPage() {
    if (currentPage <= 1) return;
    currentPage--;
    queueRenderPage(currentPage);
    updateNavigationButtons();
}

function onNextPage() {
    if (!pdfDoc || currentPage >= pdfDoc.numPages) return;
    currentPage++;
    queueRenderPage(currentPage);
    updateNavigationButtons();
}

function updateNavigationButtons() {
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    
    if (prevPageBtn) prevPageBtn.disabled = currentPage <= 1;
    if (nextPageBtn) nextPageBtn.disabled = !pdfDoc || currentPage >= pdfDoc.numPages;
}

function onZoomIn() {
    if (scale >= 3.0) return;
    scale += 0.2;
    renderPage(currentPage);
}

function onZoomOut() {
    if (scale <= 0.5) return;
    scale -= 0.2;
    renderPage(currentPage);
}

function closePDFViewer() {
    const pdfModal = document.getElementById('pdfModal');
    if (pdfModal) {
        pdfModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    const pdfCanvas = document.getElementById('pdf-canvas');
    if (pdfCanvas && pdfCanvas.getContext) {
        const context = pdfCanvas.getContext('2d');
        context.clearRect(0, 0, pdfCanvas.width, pdfCanvas.height);
    }
}

// ============================
// تهيئة الصفحة مع نظام تنزيل جديد
// ============================

function initPage() {
    showSpinner('جاري تحميل الصفحة...');
    
    // إعداد الوضع المظلم
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }
    }
    
    // إضافة مستمعي الأحداث الأساسية
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // إعداد العد التنازلي إذا كان موجوداً
    if (document.getElementById('days')) {
        initCountdown();
    }
    
    // إعداد المواد إذا كانت موجودة
    if (document.getElementById('subjectsGrid')) {
        initSubjects();
    }
    
    // ============================
    // نظام تنزيل بسيط يعمل كل مرة
    // ============================
    
    // 1. أزرار التنزيل في صفحة الامتحانات
    document.addEventListener('click', function(e) {
        const target = e.target;
        
        // أزرار التنزيل العادية
        if (target.classList.contains('download-btn') && target.hasAttribute('href')) {
            e.preventDefault();
            const url = target.getAttribute('href');
            const filename = target.getAttribute('download') || extractFilename(url);
            downloadWithWatermark(url, filename);
        }
        
        // أزرار العرض
        if (target.classList.contains('view-pdf-btn')) {
            const url = target.getAttribute('data-pdf');
            const title = target.getAttribute('data-title') || 
                         target.closest('.exam-list-item')?.querySelector('span')?.textContent || 
                         'ملف PDF';
            openPDFViewer(url, title);
        }
    });
    
    // 2. إعداد عارض PDF
    const pdfCloseBtn = document.getElementById('pdfCloseBtn');
    if (pdfCloseBtn) {
        pdfCloseBtn.addEventListener('click', closePDFViewer);
    }
    
    const prevPageBtn = document.getElementById('prevPageBtn');
    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', onPrevPage);
    }
    
    const nextPageBtn = document.getElementById('nextPageBtn');
    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', onNextPage);
    }
    
    const zoomInBtn = document.getElementById('zoomInBtn');
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', onZoomIn);
    }
    
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', onZoomOut);
    }
    
    // 3. إغلاق المودالات
    const closeModalBtn = document.getElementById('closeModal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            const resourcesModal = document.getElementById('resourcesModal');
            if (resourcesModal) {
                resourcesModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // إغلاق بالنقر خارج المودال
    window.addEventListener('click', (e) => {
        const resourcesModal = document.getElementById('resourcesModal');
        if (resourcesModal && e.target === resourcesModal) {
            resourcesModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        
        const pdfModal = document.getElementById('pdfModal');
        if (pdfModal && e.target === pdfModal) {
            closePDFViewer();
        }
    });
    
    // إغلاق بـ Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const pdfModal = document.getElementById('pdfModal');
            if (pdfModal && pdfModal.style.display === 'block') {
                closePDFViewer();
            }
            
            const resourcesModal = document.getElementById('resourcesModal');
            if (resourcesModal && resourcesModal.style.display === 'block') {
                resourcesModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    // 4. دوال التدوير
    const rotateLeftBtn = document.getElementById('rotateLeftBtn');
    if (rotateLeftBtn) {
        rotateLeftBtn.addEventListener('click', rotateLeft);
    }

    const rotateRightBtn = document.getElementById('rotateRightBtn');
    if (rotateRightBtn) {
        rotateRightBtn.addEventListener('click', rotateRight);
    }
    
    // 5. إنشاء الجسيمات
    if (document.getElementById('particlesContainer')) {
        createParticles();
    }
    
    // 6. وظائف القائمة الجانبية
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const sidebarMenu = document.getElementById('sidebarMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const themeToggleSidebar = document.getElementById('themeToggleSidebar');

    if (hamburgerMenu && sidebarMenu && menuOverlay) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('open');
            sidebarMenu.classList.toggle('open');
            menuOverlay.classList.toggle('active');
            document.body.style.overflow = sidebarMenu.classList.contains('open') ? 'hidden' : 'auto';
        });
        
        menuOverlay.addEventListener('click', () => {
            hamburgerMenu.classList.remove('open');
            sidebarMenu.classList.remove('open');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        if (themeToggleSidebar) {
            themeToggleSidebar.addEventListener('click', function() {
                toggleTheme.call(this);
            });
        }
    }
    
    // إخفاء spinner عند تحميل الصفحة
    window.addEventListener('load', () => {
        setTimeout(() => {
            hideSpinner();
            handleScroll();
        }, 800);
    });
}

// دالة مساعدة للتنزيل المباشر
function triggerDownload(url, filename = null) {
    downloadWithWatermark(url, filename);
}

// تشغيل تهيئة الصفحة
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}

// جعل الدوال متاحة عالمياً
window.openPDFViewer = openPDFViewer;
window.closePDFViewer = closePDFViewer;
window.downloadWithWatermark = downloadWithWatermark;
window.triggerDownload = triggerDownload;
window.rotateLeft = rotateLeft;
window.rotateRight = rotateRight;
(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const revealTargets = [
        '.section-title', '.access-card', '.countdown-card', '.comments-container',
        '.subject-card', '.exam-card', '.tip-card', '.resource-item', '.location-card',
        '.info-card', '.contact-card', '.footer-section'
    ];

    const initReveal = () => {
        const elements = document.querySelectorAll(revealTargets.join(','));
        if (!elements.length) return;
        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            elements.forEach(el => el.classList.add('is-visible'));
            return;
        }
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
        elements.forEach((el, index) => {
            el.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 55}ms`);
            observer.observe(el);
        });
    };

    const initTilt = () => {
        if (prefersReducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
        document.querySelectorAll('.access-card, .subject-card, .exam-card, .tip-card').forEach(card => {
            card.addEventListener('pointermove', event => {
                const rect = card.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;
                card.style.setProperty('--rx', `${y * -3}deg`);
                card.style.setProperty('--ry', `${x * 3}deg`);
                card.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`);
                card.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`);
            });
            card.addEventListener('pointerleave', () => {
                card.style.setProperty('--rx', '0deg');
                card.style.setProperty('--ry', '0deg');
                card.style.setProperty('--mx', '50%');
                card.style.setProperty('--my', '50%');
            });
        });
    };

    const initRipple = () => {
        document.addEventListener('click', event => {
            const target = event.target.closest('.carousel-btn, .submit-comment-btn, .theme-toggle, .theme-toggle-sidebar');
            if (!target) return;
            const rect = target.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ui-ripple';
            ripple.style.left = `${event.clientX - rect.left}px`;
            ripple.style.top = `${event.clientY - rect.top}px`;
            target.appendChild(ripple);
            setTimeout(() => ripple.remove(), 650);
        });
    };

    const initActiveNavigation = () => {
        const current = location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.menu-item a').forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;
            link.classList.toggle('active', href.split('/').pop() === current);
        });
    };

    const init = () => {
        initReveal();
        initTilt();
        initRipple();
        initActiveNavigation();
        document.documentElement.classList.add('premium-ui-ready');
    };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
    else init();
})();
