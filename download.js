// ============================================================
// نظام التنزيل المشترك — يُستخدم في كل صفحات الموقع
//
// لماذا هذا الملف ضروري:
// الروابط المباشرة مثل <a href="https://res.cloudinary.com/..." download>
// لا تعمل بشكل موثوق، لأن خاصية download يتجاهلها المتصفح لأي رابط
// من نطاق (domain) مختلف عن موقعك لأسباب أمنية. الحل الوحيد الموثوق:
// جلب الملف كـ Blob أولاً، ثم إنشاء رابط تنزيل محلي (blob:) منه —
// وهذا ما تقوم به هذه الدالة، بالإضافة إلى إضافة علامة مائية (إن
// توفرت مكتبة PDFLib وصورة الشعار) وحفظ الملف باسمه الأصلي المطلوب،
// بدل الاسم العشوائي الذي يولّده Cloudinary داخل الرابط.
//
// يتطلب (اختياري): تحميل مكتبة pdf-lib في الصفحة لتفعيل العلامة
// المائية: <script src="https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js"></script>
// إن لم تكن المكتبة محمّلة، يتم التنزيل بدون علامة مائية تلقائياً.
// ============================================================
(function () {
    const WATERMARK_LOGO_URL = 'golden_watermark.png';

    function ensurePdfExtension(name) {
        if (!name) return 'ملف.pdf';
        return name.toLowerCase().endsWith('.pdf') ? name : name + '.pdf';
    }

    async function addWatermarkToPDF(pdfBytes) {
        try {
            if (typeof PDFLib === 'undefined') return pdfBytes;
            const { PDFDocument } = PDFLib;
            const pdfDoc = await PDFDocument.load(pdfBytes);

            let logoImage = null;
            try {
                const res = await fetch(WATERMARK_LOGO_URL);
                if (res.ok) {
                    const logoBytes = await res.arrayBuffer();
                    logoImage = await pdfDoc.embedPng(logoBytes);
                }
            } catch (e) {
                // صورة الشعار غير موجودة على الاستضافة — نتجاهل بصمت ونكمل بدون شعار
            }

            if (logoImage) {
                pdfDoc.getPages().forEach(page => {
                    page.drawImage(logoImage, { x: 20, y: 40, width: 100, height: 100, opacity: 0.9 });
                    page.drawText('https://golden-bac.vercel.app/', {
                        x: 100, y: 15, size: 10,
                        color: PDFLib.rgb(0.3, 0.3, 0.3), opacity: 0.5
                    });
                });
            }
            return await pdfDoc.save();
        } catch (e) {
            console.error('Watermark error:', e);
            return pdfBytes;
        }
    }

    // filename: الاسم الأصلي المطلوب حفظ الملف به (بدون اعتماد على رابط Cloudinary)
    async function downloadWithWatermark(url, filename) {
        const fallbackName = (url.split('/').pop() || 'ملف').split('?')[0];
        const finalName = ensurePdfExtension(filename || fallbackName);

        if (typeof showSpinner === 'function') showSpinner('جاري تحضير الملف للتنزيل...');
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error('فشل تحميل الملف من الخادم');
            let bytes = await res.arrayBuffer();

            if (typeof PDFLib !== 'undefined') {
                try {
                    bytes = await addWatermarkToPDF(bytes);
                } catch (e) {
                    console.warn('تعذّرت إضافة العلامة المائية، سيُنزَّل الملف بدونها', e);
                }
            }

            const blob = new Blob([bytes], { type: 'application/pdf' });
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = finalName;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            setTimeout(() => {
                document.body.removeChild(link);
                URL.revokeObjectURL(blobUrl);
            }, 300);

            if (typeof showToast === 'function') showToast(`تم تنزيل "${finalName}"`, 'success');
        } catch (e) {
            console.error('Download error:', e);
            if (typeof showToast === 'function') {
                showToast('تعذّر التنزيل التلقائي، سيتم فتح الملف لحفظه يدوياً', 'warning');
            }
            window.open(url, '_blank');
        }
        if (typeof hideSpinner === 'function') hideSpinner();
    }

    window.downloadWithWatermark = downloadWithWatermark;
})();