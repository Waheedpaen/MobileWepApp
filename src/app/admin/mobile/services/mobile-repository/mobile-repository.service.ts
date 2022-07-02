import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMobileRepository } from 'src/app/Shared/common-classes/Irepoository/IRepository';
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
export class MobileRepositoryService extends  IMobileRepository{
  GetMobileByBrand(id: number) {
   return this.http.get(environment.urlMobile + '/GetMobileByBrand/' + id);
  }
  GetImageForSaveList(obj: any) {
    return this.http.post(environment.urlMobile + '/MobileImageSave',obj);
  }
  GetColor() {
 return    this.http.get(environment.urlMobile + '/GetColor')
  }

  constructor(public http: HttpClient) {
    super();
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

  DeleteSingleMobileImageData(id: number) {
    return this.http.delete(environment.urlMobile + '/DeleteSingleMobileImageData/'+ id);
  }
  GetAll() {
    return this.http.get(environment.urlMobile + '/MobileList');
  }
  GetData(id: number) {
    return this.http.get(environment.urlMobile + '/MobileDetail/'+ id);

  }
  SaveData(obj: any) {
   return this.http.post(environment.urlMobile + '/SaveMobile',obj);
  }
  DeleteData(id: number) {
    return this.http.delete(environment.urlMobile + '/DeleteMobileData/'+ id);

  }
  UpdateData(obj: any) {
    return this.http.put(environment.urlMobile + '/MobileUpdate',obj);
  }
  SearchData(obj: any) {
    return this.http.get(environment.urlMobile + '/SearchMobileData/'+ obj);

  }
  PdfData(data: any[], col: any[], docName: any) {
    throw new Error('Method not implemented.');
  }
  exportAsExcelFile(json: any[], excelFileName: string) {
    throw new Error('Method not implemented.');
  }
  importAsExcelFile(obj: any) {
    throw new Error('Method not implemented.');
  }
  GetOSVByOperatingSystemId(id: number) {
    return this.http.get(environment.urlMobile + '/GetOSVByOperatingSystemId/'+ id);
  }

}
