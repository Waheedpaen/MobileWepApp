import { Injectable } from '@angular/core';
import { OperatingsystemRepositoryService } from '../operatingsystem-repository/operatingsystem-repository.service';

@Injectable({
  providedIn: 'root'
})
export class OperatingsystemService {

  constructor(public OperatingSystemRepositoryService: OperatingsystemRepositoryService) { }
  GetOperatingList(){
    return this.OperatingSystemRepositoryService.GetAll();
  }
  GetOSDetail(id: number){
    return this.OperatingSystemRepositoryService.GetData(id);
  }
  SaveOperatingSystemData(obj: any){
   return this.OperatingSystemRepositoryService.SaveData(obj);
  }
  UpdateOperatingSystemData(obj: any){
    return this.OperatingSystemRepositoryService.UpdateData(obj);
  }
  DeleteOperatingSystemData(id: any){
    return this.OperatingSystemRepositoryService.DeleteData(id);
  }
  SearchingData(obj:any){
  return this. OperatingSystemRepositoryService.SearchData(obj);
  }
 extractErrorMessagesFromErrorResponse(data: any){
    return   this. OperatingSystemRepositoryService.extractErrorMessagesFromErrorResponse(data);
  }
  OperatingSystemPdfData(data: any[], col: any[],docName: any){

      this.OperatingSystemRepositoryService.PdfData(data, col,docName )
  }
  OperatingSystemExcelData(json: any[], excelFileName: string){
        this.OperatingSystemRepositoryService.exportAsExcelFile(json, excelFileName )
  }

  PrintData(data: any[], col: any[], docName: any){
    this.OperatingSystemRepositoryService.PrintData(data,col,docName);
  }










}
