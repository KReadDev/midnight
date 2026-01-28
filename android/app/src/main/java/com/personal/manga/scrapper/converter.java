package com.personal.manga.scrapper;

import android.os.Environment;

import com.itextpdf.text.*;
import com.itextpdf.text.Document;
import com.itextpdf.text.Image;
import com.itextpdf.text.pdf.PdfDocument;
import com.itextpdf.text.pdf.PdfWriter;
import com.personal.manga.domain.Constants;
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
            new File(Constants.location +"pdfs/").mkdirs();
          FileOutputStream os = new FileOutputStream(Constants.location + "pdfs/" + name + ".pdf");
          PdfWriter pdfWriter = PdfWriter.getInstance(doc, os);
            pdfWriter.open();
            doc.open();

            File imgDir = new File(location);
            List<String> locations =new ArrayList<>();

            for (File file : imgDir.listFiles()) {
              if(!file.getName().endsWith("txt")){
                locations.add(file.getPath());
              }
            }

          locations.sort(Comparator.comparingInt(converter::extractNumber));

            for (String s : locations) {

//            Arrays.sort(files);
//            for (File img : imgDir.listFiles()) {
                if(s.contains(".jpg")) {
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
            os.close();

          for (File file : imgDir.listFiles()) {
            file.delete();
          }

          imgDir.delete();
        } catch (DocumentException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }



    }

    private static int extractNumber(String s) {
        return Integer.parseInt(s.split("_")[1].split("\\.")[0]);
    }

}
