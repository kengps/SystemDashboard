const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// ฟังก์ชันสำหรับลบแท็ก HTML
function stripHtmlTags(text) {
    return text.replace(/<\/?[^>]+(>|$)/g, "");
}

function createPDF(value) {
    return new Promise((resolve, reject) => {
       // const doc = new PDFDocument({ size: 'A4' });
        const doc = new PDFDocument({ size: [676 ,463]});
        const filePath = path.join(__dirname, 'bill.pdf');
        const writeStream = fs.createWriteStream(filePath);
        doc.pipe(writeStream);

        // กำหนดฟอนต์
        const fontPath = path.join(__dirname, 'fonts', 'THSarabunNew.ttf');
        doc.font(fontPath).fontSize(20).text('บิลค่าห้อง', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12);

        // กำหนดค่าตำแหน่ง x และ y
        const startX = 50;
        const startY = 100;
        const columnSpacing = 150;

        // หัวตาราง
        doc.text('ห้อง', startX, startY);
        doc.text('ผู้รายงาน', startX + columnSpacing, startY);
        doc.text('ปัญหา', startX + 2 * columnSpacing, startY);

        // ค่าข้อมูล
        doc.text(stripHtmlTags(value.caseId), startX, startY + 20);
        doc.text(stripHtmlTags(value.reporter), startX + columnSpacing, startY + 20);
        doc.text(stripHtmlTags(value.problem), startX + 2 * columnSpacing, startY + 20);

        // ข้อมูลเพิ่มเติม
        doc.moveDown();
        doc.text(`รายละเอียดปัญหา: ${stripHtmlTags(value.problemDetail)}`);
        doc.text(`รายละเอียด: ${stripHtmlTags(value.detail)}`);
        doc.text(`แคมเปญ: ${stripHtmlTags(value.campgame)}`);
        doc.text(`กระเป๋าเงิน: ${stripHtmlTags(value.wallet)}`);
        doc.text(`ผู้บันทึก: ${stripHtmlTags(value.recorder)}`);
        doc.text(`สถานะ: ${stripHtmlTags(value.status)}`);
        doc.moveDown();

        // สิ้นสุดเอกสาร
        doc.end();

        // กำหนดเหตุการณ์สำหรับ write stream
        writeStream.on('finish', () => {
            resolve(filePath);
        });

        writeStream.on('error', (err) => {
            reject(err);
        });
    });
}

module.exports = createPDF;
