
export  abstract class  IRepository {
 abstract GetAll():any;
 abstract GetData(id: number): any;
 abstract SaveData(obj: any): any;
 abstract DeleteData(id: number): any;
 abstract UpdateData(obj: any): any;
 abstract SearchData(obj:any):any;
 abstract PdfData(data: any[], col: any[],docName: any):any;
 abstract exportAsExcelFile(json: any[], excelFileName: string):any;
 abstract importAsExcelFile(obj:any): any;
 abstract PrintData(data: any[], col: any[],docName: any): any;
}

export  abstract class IBrandRepository extends IRepository{

}

export  abstract class IOperatingSystemRepository extends IRepository{

}
export  abstract class IOSVRepository extends IRepository{
}
export  abstract class IUserRepository extends IRepository{
  abstract getRole():any;
  abstract signUp(obj:any): any;
  abstract getDecodedAccessToken(token: any): any;
  abstract CheckNameExistence(name:string):any;
  abstract GetUsers():any;
  abstract GetUserCount():any;
  abstract  GetUserTypes():any;
}

export abstract class IMobileRepository extends IRepository{
  abstract GetMobileByBrand(id: number):any;
  abstract  DeleteSingleMobileImageData(id: number): any;
  abstract GetOSVByOperatingSystemId(id: number): any;
  abstract GetColor(): any;
  abstract GetImageForSaveList(obj:any):any;
  abstract GetMobilesByColor(name:string):any;
  abstract GetMobilesByPrice(range:any):any;
  abstract GetMobilesByScreen(range:any):any;
}

export abstract class IOrderRepository extends IRepository
{
  abstract AddUserOrder(usreTypeId: number,OrderList:any):any;
}
