import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, NgForm, Validators, UntypedFormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { GlobalConstants } from 'src/app/Shared/common-classes/GlobalConstants/GlobalConstants';
import { BrandService } from '../../brand/services/brand-service/brand.service';
import { OperatingsystemService } from '../../operating-system/services/operatingsystem-service/operatingsystem.service';
import { OSVersionService } from '../../os-version/services/operatingsystem-version-service/osversion.service';
import { MobileEntity, MobileImageEntity } from '../mobile-entity/mobile-entity';
import { MobileServiceService } from '../services/mobile-service/mobile-service.service';

@Component({
  selector: 'app-mobile-edit',
  templateUrl: './mobile-edit.component.html',
  styleUrls: ['./mobile-edit.component.css']
})
export class MobileEditComponent implements OnInit {
  disableOSV=false;
  form: any;
  @Input() Id!: number;
  @Input() statusCheck: any;
  data: any = {};
  imageListForSave: any=[];
  imageSrcList: any=[];
  imageSrc:any[]=[];
  @ViewChild(NgForm) Form: any;
  OSList: any=[];
  OSVList: any=[];
 brandList: any=[];
 colorList:any=[];
  fileToUpload: any;
  FileName: any;
  response: any;
  constructor
  (public formBulider:UntypedFormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private _NgbActiveModal: NgbActiveModal,
    public _operatingSystems : OperatingsystemService,
    public _osVersion: OSVersionService,
    public _mobileServices: MobileServiceService,
    public _brandServices: BrandService,

    ) {
      this.form = this.formBulider.group({
        Id:new UntypedFormControl(''),
        Name:['', [Validators.required,Validators.minLength(3),Validators.pattern(/^[a-zA-Z .,']*$/)]],
        Processor:new UntypedFormControl(null, [Validators.required]),
        BatteryMah:new UntypedFormControl(null, [Validators.required]),
        Wifi:new UntypedFormControl(null, [Validators.required]),
        Storage:new UntypedFormControl(null, [Validators.required]),
        LaunchDate:new UntypedFormControl(null, [Validators.required]) ,
        Ram:new UntypedFormControl(null, [Validators.required]),
        StockAvailiability:new UntypedFormControl(null, [Validators.required]),
        MobileWeight: new UntypedFormControl(null, [Validators.required]),
        Charger:new UntypedFormControl(null, [Validators.required]),
        ScreenSize:new UntypedFormControl(null, [Validators.required]),
        ScreenType:new UntypedFormControl(null, [Validators.required]),
        Resolution:new UntypedFormControl(null, [Validators.required]),
        HeadPhoneJack:new UntypedFormControl(null, [Validators.required]),
        Bluetooth:new UntypedFormControl(null),
        USBConnector  :new UntypedFormControl(null, [Validators.required]),
        Image:  new UntypedFormControl(null, [Validators.required]),
        Camera:new UntypedFormControl(null, [Validators.required]),
        Description :new UntypedFormControl(null, [Validators.required]),
        Weight:new UntypedFormControl(null, [Validators.required]),
        Stock:new UntypedFormControl(null, [Validators.required]),
        CPU :new UntypedFormControl(null, [Validators.required]),
        Sell :new UntypedFormControl(null, [Validators.required]),
        MobilePrice :new UntypedFormControl(null, [Validators.required]),
        Battery:new UntypedFormControl(null, [Validators.required]),
        Quantity:new UntypedFormControl(null, [Validators.required]),
        BrandId:new UntypedFormControl(null, [Validators.required]),
        OSVersionId :new UntypedFormControl(null, [Validators.required]),
        OperatingSystemId :new UntypedFormControl(null, [Validators.required]),
        ColorId  :new UntypedFormControl(null, [Validators.required]),
      })
    }
    updateMobile(form: NgForm){
      debugger;
      const obj = new MobileEntity();
      obj.id =  this.form.get('Id')?.value;
      obj.stock = this.form.value.Stock;
      obj.quantity = this.form.value.Quantity;
      obj.description = this.form.get('Description')?.value;
      obj.camera = this.form.get('Camera')?.value;
      obj.usbConnector = this.form.get('USBConnector')?.value;
      obj.name = this.form.get('Name')?.value;
      obj.processor = this.form.get('Processor')?.value;
      obj.storage = this.form.get('Storage')?.value;

      obj.ram =  this.form.value.Ram;
      obj.batteryMah = this.form.get('BatteryMah')?.value;
      obj.mobileWeight = this.form.get('MobileWeight')?.value;
      obj.screenType = this.form.get('ScreenType')?.value;
      obj.resolution = this.form.value.Resolution;
      obj.blueTooth = this.form.get('Bluetooth')?.value;
      obj.screenSize = this.form.get('ScreenSize')?.value;
      obj.charger = this.form.get('Charger')?.value;
      obj.headPhoneJack = this.form.get('HeadPhoneJack')?.value;
      obj.wifi = this.form.get('Wifi')?.value;
      obj.stockAvailiability = this.form.get('StockAvailiability')?.value;
      obj.cpu = this.form.get('CPU')?.value;
      obj.brandId = this.form.get('BrandId')?.value;
      obj.oSVersionId = this.form.get('OSVersionId')?.value;
      obj.colorId = this.form.get('ColorId')?.value;
      obj.weight = this.form.get('Weight')?.value;

      this.imageSrc.forEach(datas=>{
        const image = new MobileImageEntity();
        image.mobileId = this.form.get('Id')?.value;
        image.ImageUrl = datas;
          this.imageListForSave.push(image)
        })



        this._mobileServices. GetImageForSaveList(this.imageListForSave).subscribe(res=>{
          this.response = res;
          if(this.response.success == true){
            this.toastr.success(this.response.message,'Message.');
            this.activeModal.close();
            this.spinner.hide();
          }
          else{
            this.toastr.error(this.response.message,'Message.');
            this.spinner.hide();
          }
        },
        (err: HttpErrorResponse)=>{
          const message = this._brandServices.extractErrorMessagesFromErrorResponse(err);
          this.toastr.error(message.toString(),'Message .');
          console.log(message);
          this.spinner.hide();
        });

        this._mobileServices.UpdateMobileData(obj).subscribe(
          (    res: any) =>{
            this.response = res;
            if(this.response.success == true){
              this.toastr.success(this.response.message,'Message.');
              this.activeModal.close(true);
              this.spinner.hide();
            }
            else {
              this.toastr.error(this.response.message,'Message.');
              this.spinner.hide();
            }
          },
          (err:HttpErrorResponse)=>{
            const message = this._brandServices.extractErrorMessagesFromErrorResponse(err);
            this.toastr.error(message.toString(),'Message.')
            console.log(message);
            this.spinner.hide();
          }
        );

    }
    saveMobile(form: NgForm){
      debugger;
      const obj = new MobileEntity();
      obj.stock = this.form.value.Stock;
      obj.quantity = this.form.value.Quantity;
      obj.description = this.form.get('Description')?.value;
      obj.camera = this.form.get('Camera')?.value;
      obj.usbConnector = this.form.get('USBConnector')?.value;
      obj.name = this.form.get('Name')?.value;
      obj.processor = this.form.get('Processor')?.value;
      obj.storage = this.form.get('Storage')?.value;
     obj.launchDate = this.form.value.LaunchDate;
      obj.ram =  this.form.value.Ram;
      obj.batteryMah = this.form.get('BatteryMah')?.value;
      obj.mobileWeight = this.form.get('MobileWeight')?.value;
      obj.screenType = this.form.get('ScreenType')?.value;
      obj.resolution = this.form.value.Resolution;
      obj.blueTooth = this.form.get('Bluetooth')?.value;
      obj.screenSize = this.form.get('ScreenSize')?.value;
      obj.charger = this.form.get('Charger')?.value;
      obj.headPhoneJack = this.form.get('HeadPhoneJack')?.value;
      obj.wifi = this.form.get('Wifi')?.value;
      obj.stockAvailiability = this.form.get('StockAvailiability')?.value;
      obj.cpu = this.form.get('CPU')?.value;
      obj.brandId = this.form.get('BrandId')?.value;
      obj.oSVersionId = this.form.get('OSVersionId')?.value;
      obj.colorId = this.form.get('ColorId')?.value;
      obj.weight = this.form.get('Weight')?.value;
      this.imageSrc.forEach(datas=>{
        const image = new MobileImageEntity();
         image.ImageUrl = datas;
         obj.mobileImages.push(image);
        })
        this._mobileServices.SaveMobileData(obj).subscribe(
          res=>{
            this.response = res;
            if(this.response.success == true){
              this.toastr.success(this.response.message,'Message.');
              this.activeModal.close();
              this.spinner.hide();
            }
            else{
              this.toastr.error(this.response.message,'Message.');
              this.spinner.hide();
            }
          },
          (err: HttpErrorResponse)=>{
            const message = this._brandServices.extractErrorMessagesFromErrorResponse(err);
            this.toastr.error(message.toString(),'Message .');
            console.log(message);
            this.spinner.hide();
          });

    }
   ngOnInit() {
    this.statusCheck = this.statusCheck;
    console.log(this.statusCheck + 'sam');
    if (this.statusCheck == 'Edit') {
      debugger;
this.mobileDetail();
    }
    this.brandDataList();
    this.getOperatingSystemList();
    this.getOSVList();
console.log(this.imageSrc)
    this.getColor();

  }
  getOperatingSystemList(){
  this._operatingSystems.GetOperatingList().subscribe((res:any)=> {
    this.OSList = res
    console.log(this.OSList)
   })
  }
  getOSVList(){
  this._osVersion.GetOSVersionList().subscribe((res:any)=>{

  })
  }

  get activeModal() {
    return this._NgbActiveModal;
  }
  getOSVByOperatingSystemId(id: number){
  this._mobileServices.GetOSVByOperatingSystemId(id).subscribe((res: any)=>{
    this.OSVList = res.data;
  })
  }
  brandDataList(){
  this._brandServices.GetBrandList().subscribe((data:any)=>{
  this. brandList = data;
  })
  }
  getOSVByoperatingSystem(Id:any){
  debugger;
  this.  disableOSV = true;
  this._mobileServices.GetOSVByOperatingSystemId(Number(Id)).subscribe((obj:any)=>{
    this.OSVList = obj
  })
  }
  getColor(){
  this._mobileServices.GetColor().subscribe((data:any)=>{
this.colorList = data;
  })
  }

  mobileDetail(){
  this.spinner.show();
  console.log(this.Id);
  this._mobileServices.GetMobileDetail(this.Id).subscribe(res=>{
    this.response = res;
    if(this.response.success == true){
      this.data = this.response.data;
      this.form.controls.Id.setValue(this.data?.id);
    this.form.controls.Name.setValue(this.data?.name);
    this.form.controls.Ram.setValue(this.data?.ram);
    this.form.controls.Storage.setValue(this.data?.storage);
    this.form.controls.MobileWeight.setValue(this.data?.mobileWeight);
    this.form.controls.Description.setValue(this.data?.description);
    this.form.controls.Camera.setValue(this.data?.camera);
    this.form.controls. HeadPhoneJack.setValue(this.data?.headPhoneJack);
    this.form.controls.USBConnector.setValue(this.data?.uSBConnector);
    this.form.controls.Stock.setValue(this.data?.stock);
    this.form.controls.CPU.setValue(this.data?.cPU);
    this.form.controls.Quantity.setValue(this.data?.quantity);
    this.form.controls.ScreenSize.setValue(this.data?.screenSize);
    this.form.controls.BrandId.setValue(this.data?.brandId);
    this.form.controls.Bluetooth.setValue(this.data?.bluetooth);
    this.form.controls.Description.setValue(this.data?.description);
    this.form.controls.OSVersionId.setValue(this.data?.oSVersionId);
    this.form.controls.ColorId.setValue(this.data?.colorId);
     this.form.controls.Charger.setValue(this.data?.charger);
    this.form.controls.LaunchDate.setValue(this.data?.launchDate);
    this.form.controls.BatteryMah.setValue(this.data?.batteryMah);
    this.form.controls.OperatingSystemId.setValue(this.data?.osVersion.operatingSystemId);
    this.form.controls.   OSVersionId.setValue(this.data?.osVersionId);
    this.getOSVByoperatingSystem(this.data?.osVersion.operatingSystemId);
    this.form.controls.LaunchDate.setValue(this.data?.launchDate);
    this.data.mobileImages.forEach((data : any) => {
      this. imageSrcList.push(data);
      this.spinner.hide();
    })}
    else{
      this.toastr.error(this.response.message,'Message .');
      this.spinner.hide();
    }
      },err=>{
        if(err.status == 400){
          this.toastr.error(this.response.message,'Message.');
          this.spinner.hide();
        }
      }
    );
  }

  onSubmit(buttonType:any):void {
    if(buttonType === "Add"){
      this.saveMobile(this.Form)
    }
    if(buttonType === "Edit"){
      this.updateMobile(this.Form);
    }
  }
  public handleFileInput(files: FileList) {
    debugger;
    this.fileToUpload = files.item(0);
    const file    :any = files.item(0);
    this.FileName = file.name;
    this.fileToUpload = files.item(0);
  }
  onFileChange(event: any) {
    this.handleFileInput(event.target.files);
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event:any) => {
                  var list = event.target.result;
                  console.log(event.target.result);
                   this.imageSrc.push(list);
                   this.form.patchValue({
                    Image: this.imageSrc
                 });

                }

                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }
  openDeleteDialogConfarmation(data: any){
    debugger
    this.  imageSrcList.splice(data, 1);
    this.imageSrc.splice(data, 1);
  }

  openDeleteDialogConfarmations(Id:any,index: any){
    debugger;
    this.  imageSrcList.splice(index, 1);
   this._mobileServices.DeleteSingleMobileImageData(Id) .subscribe(
    res=>{
      this.response = res;
      if(this.response.success ==true){

        this.toastr.error(GlobalConstants.deleteSuccess, 'Message. ')
        this.spinner.hide();
      }
    },err=>{
      if(err.status == 400){
        this.toastr.error(this.response.message,'Message');
      }
    },
  )


  }
}
