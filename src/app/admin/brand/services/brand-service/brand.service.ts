import { Injectable } from '@angular/core';
import { BrandRepositoryService } from '../brand-repository/brand-repository.service';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(public brandRepository: BrandRepositoryService ) { }
  GetBrandList(){
    return this.brandRepository.GetAll();
  }
  GetBrandDetail(id: number){
    return this.brandRepository.GetData(id);
  }
  SaveBrandData(obj: any){
    return this.brandRepository.SaveData(obj);
  }
  UpdateBrandData(obj:any){
  return  this.brandRepository.UpdateData(obj);
  }
  DeleteBrandData(id: number){
    return this.brandRepository.DeleteData(id);
  }
  SearchingData(obj:any){
    return this. brandRepository.SearchData(obj);
  }
  extractErrorMessagesFromErrorResponse(data: any){
      return   this.brandRepository.extractErrorMessagesFromErrorResponse(data);
  }
  BrandPdfData(data: any[], col: any[],docName: any){
  this.brandRepository.PdfData(data, col,docName )
  }
  BrandExcelData(json: any[], excelFileName: string){
    this.brandRepository.exportAsExcelFile(json, excelFileName )
  }
  SaveBrandListExcel(obj: any){
   return this.brandRepository.importAsExcelFile(obj);
  }
  PrintData(data: any[], col: any[], docName: any){
    this.brandRepository.PrintData(data,col,docName);
  }

  }

