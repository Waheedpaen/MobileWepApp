import { BaseEntity } from "src/app/Shared/common-classes/base-entity/base-entity";


export class MobileEntity extends BaseEntity {
colorId!: number;
brandId!:number;
oSVersionId!:number;
quantity!:number;
stockAvailiability!:boolean;
cpu!: string;
sell!:number;
mobilePrice!:number;
batteryMah!: string;
stock!:number;
weight!: string;
description!: string;
camera!: string;
usbConnector!:string;
wifi!: string;
resolution!: string;
screenType!: string;
headPhoneJack !: string;
screenSize!: string;
mobileWeight !: string;
processor!: string;
storage!: string;
blueTooth!:string;
ram!: string;
charger!: string;
launchDate!:Date;
mobileImages:MobileImageEntity[] =[];
}

export class MobileImageEntity
{
  id!:number ;
  ImageUrl!:string;
  mobileId !:number
}
