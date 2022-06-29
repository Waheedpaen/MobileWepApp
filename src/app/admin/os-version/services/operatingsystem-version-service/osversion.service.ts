import { Injectable } from '@angular/core';
import { OperatingsystemVersionRepositoryService } from '../operatingsystem-version-repository/operatingsystem-version-repository.service';

@Injectable({
  providedIn: 'root'
})
export class OSVersionService {

  constructor(public OSVersionRepositoryService: OperatingsystemVersionRepositoryService ) { }
  GetOSVersionList(){
  return this.OSVersionRepositoryService.GetAll();
  }
  GetOSVersionDetail(id:number){
  return this.OSVersionRepositoryService.GetData(id);
  }
  SaveOSVersionData(obj:any){
  return this.OSVersionRepositoryService.SaveData(obj);
  }
  UpdateOSVersionData(obj:any){
  return this.OSVersionRepositoryService.UpdateData(obj);
  }
  DeleteOSVersionData(id: any){
  return this.OSVersionRepositoryService.DeleteData(id);
  }
  SearchingData(obj:any){
   return this.OSVersionRepositoryService.SearchData(obj);
  }
  OSVersionPdfData(data: any[], col: any[],docName: any){
    this.OSVersionRepositoryService.PdfData(data, col,docName )
  }
  OSVersionExcelData(json: any[], excelFileName: string){
   this.OSVersionRepositoryService.exportAsExcelFile(json, excelFileName )
  }
}
