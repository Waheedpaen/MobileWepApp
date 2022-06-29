export class  UserForLoginDto {
  username!:string;
  email!:string;
  password!:string;
  fullName!:string;
  userType!: number;
  userTypeId!: number
  imageUrl:any;

}

export class  UserForUpdate {
  id!:number;
  username!:string;
  name!:string;
  imageUrl:any;

}
