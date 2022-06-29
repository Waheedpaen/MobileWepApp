import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrandRepository, IRepository } from 'src/app/Shared/common-classes/Irepoository/IRepository';
import { environment } from 'src/environments/environment';
 import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');
import 'jspdf-autotable';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root'
})
export class BrandRepositoryService  extends   IBrandRepository {
  setiFrameForPrint(doc: any) {
    const iframe = document.createElement("iframe");
    iframe.id = "iprint";
    iframe.name = "iprint";
    iframe.src = doc.output("bloburl");
    iframe.setAttribute("style", "display: none;");
    document.body.appendChild(iframe);
    iframe.contentWindow?.print();
  }
  PrintData(data: any[], col: any[], docName: any) {
    const doc = new jsPDF({
      orientation: "A4"
    });
    col = col.map(x => x.prop)
    var rows = [];
    for (let i = 0; i < data.length; i++) {
      var temp =[];
       for (let key in data[i]) {
          for (let clm of col) {
          if (key == clm) {
            temp.push(data[i][key]);
          }

        }


      }
      rows.push(temp);
    }


    let officeCd = "All";

    let today = new Date();
    var header = function(data: any) {
      doc.setFontSize(18);
      doc.setTextColor(40);
      doc.setFontStyle('normal');
      //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
      doc.text(docName, data.settings.margin.left, 15);
    };
    var options = {
      beforePageContent: header,
      margin: {
        top: 15
      },
      startY: doc.autoTableEndPosY() + 20
    };
    doc.autoTable(col, rows,options, {margin: {top: 80}})

    this.setiFrameForPrint(doc);



  }



  constructor(public http: HttpClient) {
    super();
  }
  GetAll() {
    return this.http.get(environment.brandUrl + '/BrandList');
  }
  GetData(id: number) {
  return this.http.get(environment.brandUrl + '/BrandDetail/' + id);
  }
  SaveData(obj: any) {
  return this.http.post(environment.brandUrl + '/SaveBrand',obj);
  }
  DeleteData(id: number) {
  return this.http.delete(environment.brandUrl + '/DeleteBrandData/' + id);
  }
  UpdateData(obj: any) {
  return this.http.put (environment.brandUrl + '/UpdateBrand' ,obj)
  }
  SearchData(obj: any) {
  return this.http.get(environment.brandUrl + '/SearchData/'+ obj);
  }
  extractErrorMessagesFromErrorResponse(errorResponse: HttpErrorResponse) {
    // 1 - Create empty array to store errors
    const errors: any[][] = [];

    // 2 - check if the error object is present in the response
    if (errorResponse.error) {

      // 4 - Check for Laravel form validation error messages object
      if (errorResponse.error.errors) {

        // 5 - For each error property (which is a form field)
        for (const property in errorResponse.error.errors) {

          if (errorResponse.error.errors.hasOwnProperty(property)) {

            // 6 - Extract it's array of errors
            const propertyErrors: Array<string> = errorResponse.error.errors[property ];

            // 7 - Push all errors in the array to the errors array
            propertyErrors.forEach(error => errors.push(error.split('|')));
          }

        }

      }

    }
    return errors;
  }

  PdfData(data: any[], col: any[],docName: any) {
    debugger
   var doc = new jsPDF({
  orientation:"A4"
   });

  col= col.map(x =>x.prop);
  var rows = [];

  for (let i = 0; i < data.length; i++) {
    var temp =[];
     for (let key in data[i]) {
        for (let clm of col) {
        if (key == clm) {
          temp.push(data[i][key]);

        }
        // let index = rows.indexOf(temp);
        //   if (index == -1)

      }

      //doc.addText(item[key]);
    }
    rows.push(temp);
  }
  // console.log(col,rows)
  var header = function(data: any) {
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.setFontStyle('normal');
    //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
    doc.text(docName, data.settings.margin.left, 15);
  };
  var options = {
    beforePageContent: header,
    margin: {
      top: 15
    },
    startY: doc.autoTableEndPosY() + 20
  };
  doc.autoTable(col, rows,options, {margin: {top: 80}});

  doc.save(docName);
    }

    exportAsExcelFile(json: any[], excelFileName: string) {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
      this.saveAsExcelFile(excelBuffer, excelFileName);
    }
    private saveAsExcelFile(buffer: any, fileName: string): void {
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }
    importAsExcelFile(obj: any) {
      return this.http.post(environment.brandUrl + '/SaveBrandListExcel',obj);
    }


    }

