export class BaseEntity{
   id!:number ;
   name!:string;
   created_At?: Date;
   modified_At?: Date;
   isDeleted?: boolean;
}
