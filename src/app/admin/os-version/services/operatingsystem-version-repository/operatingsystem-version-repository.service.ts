import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOSVRepository, IRepository } from 'src/app/Shared/common-classes/Irepoository/IRepository';
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
export class OperatingsystemVersionRepositoryService extends IOSVRepository {
  importAsExcelFile(obj: any) {
    throw new Error('Method not implemented.');
  }


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
  GetAll()  {
  return this.http.get(environment.urlOperatingSystemVersion + '/OSVersionListData');
  }
  GetData(id: number) {
    return this.http.get(environment.urlOperatingSystemVersion+ '/OSVersionDetailData/' + id);
  }
  SaveData(obj: any) {
  return this.http.post(environment.urlOperatingSystemVersion + '/SaveOSVersionData',obj)
  }
  DeleteData(id: number) {
    return this.http.delete(environment.urlOperatingSystemVersion + '/DeleteOSVersionData/'+id);
  }
  UpdateData(obj: any) {
 return this.http.put(environment.urlOperatingSystemVersion + '/UpdateOSVersionData',obj);
  }
  SearchData(obj: any) {
    return this.http.get(environment.urlOperatingSystemVersion + '/SearchData/'+ obj);
  }
  PdfData(data: any[], col: any[],docName: any) {
    var doc = new jsPDF({
   orientation:"A4"
    });
   col= col.map(x =>x.prop);
   var rows = [];
    for(let i = 0; i<data.length; i++){
    var temp =[];
     for(let key of data[i]){
     for(let clm of col){
       if(key == clm){
         temp.push(data[i][key]);
       }
     }
   }
     rows.push(temp);
     var header = function(data:any){
     doc.setFontSize(18);
     doc.setTextColor(40);
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
  }
  exportAsExcelFile(json: any[], excelFileName: string) {
       const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
       const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
       const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
       this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  public saveAsExcelFile(buffer: any, fileName: string): void {
       const data: Blob = new Blob([buffer], {
         type: EXCEL_TYPE
       });
       FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}
