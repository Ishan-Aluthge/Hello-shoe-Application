package com.nadunkawishika.helloshoesapplicationserver.util;

import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import com.nadunkawishika.helloshoesapplicationserver.dto.InvoiceDTO;
import com.nadunkawishika.helloshoesapplicationserver.dto.SaleDetailDTO;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class InvoiceUtil {
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

    public byte[] getInvoice(InvoiceDTO dto) {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(out);
        PdfDocument pdfDoc = new PdfDocument(writer);
        Document document = new Document(pdfDoc);

        LocalDateTime dateTime = LocalDateTime.now();
        String date = dateTime.format(formatter);
        double total = dto.getSaleDetailsList().stream().mapToDouble(SaleDetailDTO::getTotal).sum();

        // Add header and company details with styling
        document.add(new Paragraph("INVOICE")
                .setFontSize(26)
                .setBold()
                .setTextAlignment(TextAlignment.CENTER)
                .setMarginBottom(20));

        document.add(new Paragraph("Hello Shoes PVT LTD")
                .setFontSize(14)
                .setBold()
                .setTextAlignment(TextAlignment.CENTER));

        document.add(new Paragraph("001/A, Main Street, Colombo 01")
                .setTextAlignment(TextAlignment.CENTER));
        document.add(new Paragraph("0777700011")
                .setTextAlignment(TextAlignment.CENTER)
                .setMarginBottom(20));
        document.add(new Paragraph("#Order ID: " + dto.getSaleId().toUpperCase())
                .setFontSize(12));
        if (dto.getCustomerName() != null) {
            document.add(new Paragraph("Customer Name: " + dto.getCustomerName())
                    .setFontSize(12));
        }
        document.add(new Paragraph("Date/Time: " + date)
                .setFontSize(12));
        document.add(new Paragraph("Total Amount: Rs " + String.format("%.2f", total))
                .setFontSize(12));
        document.add(new Paragraph("Payment: " + dto.getPaymentDescription().toUpperCase() + "\n\n")
                .setFontSize(12));
        // Create and populate the table with improved styling
        if (dto.getSaleDetailsList().isEmpty()) {
            document.add(new Paragraph("Refunded")
                    .setFontSize(20)
                    .setBold()
                    .setTextAlignment(TextAlignment.CENTER)
                    .setFontColor(ColorConstants.RED)
                    .setMarginTop(10))
                    .setBottomMargin(10);
            document.add(new Paragraph("Thank You!")
                    .setFontSize(16)
                    .setBold()
                    .setTextAlignment(TextAlignment.CENTER)
                    .setMarginTop(20));
        } else {
            Table table = new Table(UnitValue.createPercentArray(new float[]{1, 3, 2, 1, 2}))
                    .useAllAvailableWidth()
                    .setMarginBottom(20);
            table.addHeaderCell(new Cell().add(new Paragraph("Item ID").setBold()).setBackgroundColor(ColorConstants.LIGHT_GRAY));
            table.addHeaderCell(new Cell().add(new Paragraph("Description").setBold()).setBackgroundColor(ColorConstants.LIGHT_GRAY));
            table.addHeaderCell(new Cell().add(new Paragraph("Unit Price").setBold()).setBackgroundColor(ColorConstants.LIGHT_GRAY));
            table.addHeaderCell(new Cell().add(new Paragraph("Quantity").setBold()).setBackgroundColor(ColorConstants.LIGHT_GRAY));
            table.addHeaderCell(new Cell().add(new Paragraph("Total").setBold()).setBackgroundColor(ColorConstants.LIGHT_GRAY));

            for (SaleDetailDTO item : dto.getSaleDetailsList()) {
                table.addCell(new Cell().add(new Paragraph(item.getItemId())));
                table.addCell(new Cell().add(new Paragraph(item.getDescription())));
                table.addCell(new Cell().add(new Paragraph(item.getPrice().toString())));
                table.addCell(new Cell().add(new Paragraph(item.getQuantity().toString())));
                table.addCell(new Cell().add(new Paragraph(item.getTotal().toString())));
            }

            document.add(table);
            document.add(new Paragraph("Cashier Name: " + dto.getCashierName())
                    .setFontSize(12)
                    .setMarginBottom(10));

            if (dto.getCustomerName() != null || dto.getSaleDetailsList().isEmpty()) {
                document.add(new Paragraph("\n------------- Loyalty ------------")
                        .setFontSize(12)
                        .setBold()
                        .setTextAlignment(TextAlignment.CENTER)
                        .setMarginTop(10));
                document.add(new Paragraph("Added Points: " + dto.getAddedPoints())
                        .setFontSize(12));
                document.add(new Paragraph("Total Loyalty Points: " + dto.getTotalPoints() + "\n\n")
                        .setFontSize(12));
            }

            document.add(new Paragraph("For Return:\nUnworn shoes can be returned within 3 days with the original receipt.\n\n")
                    .setBold()
                    .setFontSize(12)
                    .setFontColor(ColorConstants.RED));
            document.add(new Paragraph("Thank You!")
                    .setFontSize(16)
                    .setBold()
                    .setTextAlignment(TextAlignment.CENTER)
                    .setMarginTop(20));

            if (dto.getRePrinted()) {
                document.add(new Paragraph("Reprinted Invoice")
                        .setFontSize(12)
                        .setBold()
                        .setTextAlignment(TextAlignment.CENTER)
                        .setFontColor(ColorConstants.RED)
                        .setMarginTop(10));
            }
        }


        document.close();

        return out.toByteArray();
    }
}
