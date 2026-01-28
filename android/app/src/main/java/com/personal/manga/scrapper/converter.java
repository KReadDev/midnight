package com.personal.manga.scrapper;

import com.itextpdf.text.*;
import com.itextpdf.text.Document;
import com.itextpdf.text.Image;
import com.itextpdf.text.pdf.PdfDocument;
import com.itextpdf.text.pdf.PdfWriter;
//import com.itextpdf.io.image.ImageDataFactory;
//import com.itextpdf.kernel.geom.PageSize;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class converter {

    public static void convertToPdf(String location,String name)  {

        try{
            Image imgi;
            Document doc = new Document();
            PdfWriter pdfWriter = PdfWriter.getInstance(doc, new FileOutputStream("F:\\site\\pdfs\\"+name+".pdf"));
            pdfWriter.open();
            doc.open();

            File imgDir = new File(location);
            System.out.println("imgDir.list() = " + imgDir.list());
            List<String> locations =new ArrayList<>();

            for (File file : imgDir.listFiles()) {
                locations.add(file.getPath());
            }

            locations.sort(Comparator.comparingInt(converter::extractNumber));

            for (String s : locations) {
                System.out.println("s = " + s);


//            Arrays.sort(files);
//            for (File img : imgDir.listFiles()) {
                if(s.contains(".jpg")) {
                    System.out.println("img = " + s);
                    imgi = Image.getInstance(s);
//                    imgi = Image.getInstance("F:\\site\\downloading\\I Still Want To Try\\I Still Want To Try_1.png");
                    doc.setPageSize(imgi);
                    doc.newPage();
                    imgi.setAbsolutePosition(0,0);
                    doc.add(imgi);
                }
            }
            doc.close();
            pdfWriter.close();
        } catch (DocumentException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }



    }

    private static int extractNumber(String s) {
        return Integer.parseInt(s.replaceAll("\\D", ""));
    }

}
