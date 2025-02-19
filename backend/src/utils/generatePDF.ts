import PDFDocument from "pdfkit";
import { Response } from "express";
import { ISession } from "../models/session";

const generatePDF = (booking: ISession, res: Response): void => {
  const doc = new PDFDocument({ margin: 50 });

  // Set headers for PDF download
  res.setHeader("Content-Disposition", "attachment; filename=receipt.pdf");
  res.setHeader("Content-Type", "application/pdf");

  doc.pipe(res);

  // === HEADER ===
  doc
    .font("Helvetica-Bold")
    .fontSize(22)
    .text("SESSION BOOKING RECEIPT", { align: "center" })
    .moveDown(0.5);

  doc
    .fontSize(12)
    .font("Helvetica")
    .text(`Date: ${new Date().toLocaleDateString()}`, { align: "right" })
    .moveDown(1);

  // === DIVIDER LINE ===
  doc.moveTo(50, doc.y).lineTo(550, doc.y).lineWidth(1).stroke().moveDown(1.5);

  // === BOOKING DETAILS ===
  doc
    .fontSize(14)
    .font("Helvetica-Bold")
    .text("Booking Details", { underline: true })
    .moveDown(0.8);

  const details = [
    { label: "Full Name", value: booking.name },
    { label: "Age", value: booking.age.toString() },
    { label: "Number of Sessions", value: booking.sessions.toString() },
    { label: "Payment Method", value: booking.paymentMethod },
  ];

  details.forEach(({ label, value }) => {
    doc
      .font("Helvetica-Bold")
      .text(`${label}: `, { continued: true })
      .font("Helvetica")
      .text(value)
      .moveDown(0.5);
  });

  // === SECOND DIVIDER LINE ===
  doc.moveDown(1);
  doc.moveTo(50, doc.y).lineTo(550, doc.y).lineWidth(1).stroke().moveDown(1);

  // === FOOTER SECTION ===
  doc
    .fontSize(12)
    .font("Helvetica-Oblique")
    .text("Thank you for your booking!", { align: "center" })
    .moveDown(0.5);

  doc
    .fontSize(10)
    .font("Helvetica")
    .fillColor("blue")
    .text("For any inquiries, contact us at support@example.com", {
      align: "center",
      link: "mailto:support@example.com",
    });

  doc.end();
};

export default generatePDF;
