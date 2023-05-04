import { Injectable } from '@angular/core';
import { OperatingsystemRepositoryService } from '../operatingsystem-repository/operatingsystem-repository.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OperatingsystemService {

  constructor(private http: HttpClient,public OperatingSystemRepositoryService: OperatingsystemRepositoryService) { }
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




  getData(pageSize: number, pageNumber: number, searchTerm: string)  {
    let params = new HttpParams()
    .set('page', pageSize.toString())
      .set('pageSize', pageNumber.toString())
      .set('searchTerm', searchTerm);
debugger
    return this.http.get(`https://localhost:44385/api/OperatingSystem/Get`, { params })


  }







}
