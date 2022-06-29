import { Injectable } from '@angular/core';
import { MobileRepositoryService } from '../mobile-repository/mobile-repository.service';

@Injectable({
  providedIn: 'root'
})
export class MobileServiceService {

  constructor(public  _mobileRepositoryService: MobileRepositoryService ) { }
  GetMobileList(){
    return this._mobileRepositoryService.GetAll();
  }
  GetMobileDetail(id : number){
    return this._mobileRepositoryService.GetData(id);
  }
  UpdateMobileData(obj: any){
    return this._mobileRepositoryService.UpdateData(obj);
  }
  DeleteMobileData(id: number){
    return this._mobileRepositoryService.DeleteData(id);
  }
  SearchingData(obj: any){
    return this._mobileRepositoryService.SearchData(obj);
  }
  DeleteSingleMobileImageData(id : number){
    return this._mobileRepositoryService.DeleteSingleMobileImageData(id);
  }
  GetOSVByOperatingSystemId(id: number){
  return  this._mobileRepositoryService.GetOSVByOperatingSystemId(id);
  }
   GetColor(){
   return  this._mobileRepositoryService.GetColor();
   }
   SaveMobileData(obj:any){
     return this._mobileRepositoryService.SaveData(obj);
   }

   GetImageForSaveList(obj:any){
    return this._mobileRepositoryService.GetImageForSaveList(obj);
   }
}
