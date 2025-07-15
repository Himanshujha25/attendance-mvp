// controllers/pdfController.js
const PDFDocument = require("pdfkit");
const AttendanceRecord = require("../models/AttendanceRecord");

exports.downloadAttendancePDF = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).send("❌ Date is required");
    }

    const records = await AttendanceRecord.find({ date }).populate("studentId", "name email");

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=attendance-${date}.pdf`);

    doc.pipe(res);

    // ✅ Title / Header
    doc
      .fontSize(20)
      .fillColor("#0b5394")
      .text("IMS NOIDA", { align: "center", underline: true });

    doc.moveDown(0.5);

    doc
      .fontSize(14)
      .fillColor("#000")
      .text(`Attendance Report`, { align: "center" });

    doc
      .fontSize(12)
      .fillColor("#333")
      .text(`Date: ${date}`, { align: "center" });

    doc.moveDown(1);

    // ✅ Table Headers
    const tableTop = doc.y;
    const itemMargin = 25;
    const columnPositions = {
      sno: 50,
      name: 100,
      email: 300,
    };

    doc
      .fontSize(12)
      .fillColor("#ffffff")
      .rect(50, tableTop, 500, 20)
      .fill("#0b5394");

    doc
      .fillColor("#ffffff")
      .text("S.No", columnPositions.sno, tableTop + 5, { bold: true })
      .text("Name", columnPositions.name, tableTop + 5)
      .text("Email", columnPositions.email, tableTop + 5);

    doc.moveDown();

    // ✅ Table Rows
    let y = tableTop + 25;

    records.forEach((record, idx) => {
      const isEven = idx % 2 === 0;
      doc
        .fillColor(isEven ? "#000000" : "#1a1a1a")
        .fontSize(11)
        .text(idx + 1, columnPositions.sno, y)
        .text(record.studentId.name, columnPositions.name, y)
        .text(record.studentId.email, columnPositions.email, y);
      y += itemMargin;
    });

    // ✅ Footer
    doc
      .moveDown(3)
      .fontSize(10)
      .fillColor("#666")
      .text(
        `Generated on ${new Date().toLocaleString()} | Powered by StartupLabs, IMS Noida`,
        50,
        doc.page.height - 50,
        { align: "center" }
      );

    doc.end();
  } catch (err) {
    res.status(500).send("❌ Failed to generate PDF: " + err.message);
  }
};
