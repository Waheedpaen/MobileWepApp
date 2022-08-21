import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrderRepository } from 'src/app/Shared/common-classes/Irepoository/IRepository';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderRepositoryService extends IOrderRepository  {
  AddUserOrder(usreTypeId: number, OrderList: any) {
    debugger
    return this.http.post(environment.urlOrder + '/SaveUserOrder/' + usreTypeId ,OrderList);
  }
  constructor(public http: HttpClient) {
    super();
  }
  GetAll() {
    throw new Error('Method not implemented.');
  }
  GetData(id: number) {
    throw new Error('Method not implemented.');
  }
  SaveData(obj: any) {
    throw new Error('Method not implemented.');
  }
  DeleteData(id: number) {
    throw new Error('Method not implemented.');
  }
  UpdateData(obj: any) {
    throw new Error('Method not implemented.');
  }
  SearchData(obj: any) {
    throw new Error('Method not implemented.');
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
  PrintData(data: any[], col: any[], docName: any) {
    throw new Error('Method not implemented.');
  }


}
