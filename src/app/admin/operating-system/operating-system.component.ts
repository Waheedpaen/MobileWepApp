import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OperatingsystemService } from './services/operatingsystem-service/operatingsystem.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { GlobalConstants } from 'src/app/Shared/common-classes/GlobalConstants/GlobalConstants';
import { OperatingsystemEditComponent } from './operatingsystem-edit/operatingsystem-edit.component';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import pdfMake from 'pdfmake/build/pdfMake';
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-operating-system',
  templateUrl: './operating-system.component.html',
  styleUrls: ['./operating-system.component.css']
})
export class OperatingSystemComponent implements OnInit {
  clearData:any;
  studentList:any=[]
  employee:any={}
  dataSearch = {
    name:'',
    age:''
   }
  rows: any = [];
  columns: any = [];
  temp: any = [];
  response: any;
  data: any = {};
  Filter: any = []
  col = [
    { Name: 'Name', prop: 'name'},
  ];
  exampleForm: any;
  totalSum: number = 0;
     categoryCount: any;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
   public operatingSystemService:  OperatingsystemService) { }
  ngOnInit() {
    this.operatingSystem();
    this.studentListData();
    this.loadData();
    this.exampleForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(25)]],
      salary: [''],
      id: [''],

      age: [''],
      units: this.formBuilder.array([
        // load first row at start
        this.getUnit(),
      ]),
    });
    const connection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Information)
    .withUrl('https://localhost:44385/notify',{
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    }  )
    .build();

  connection.start().then(function () {
    console.log('SignalR Connected!');
  }).catch(function (err) {

    return console.error(err.toString());
  });
  connection.on("BroadcastMessage", () => {
    this.loadData();
  });
  }
  getRowClass(row: any) {
    return 'table-light-grey-row';
  }
  operatingSystem(){
     this.operatingSystemService.GetOperatingList().subscribe(
      res=>{
        this.response = res;
        if(this.response.success == true){
          this.rows  = this.response.data;
          this.spinner.hide();
        }
        else{
          this.toastr.error(this.response.message,'Message.');
        }
      },err=>{
        if(err.status == 400){
          this.toastr.error(err.error.message, 'Message.');
          this.spinner.hide();
        }
      });
  }
  deleteOperatingSystem(obj: any){
Swal.fire({
  title: GlobalConstants.deleteTitle,
  text: GlobalConstants.deleteMessage + ' ' + '"' + obj.name+ '"',
  icon: 'error',
  showCancelButton: true,
  confirmButtonColor: '#ed5565',
  cancelButtonColor: '#dae0e5',
  cancelButtonText: 'No',
  confirmButtonText: 'Yes',
  reverseButtons: true,
  position: 'top',
}).then((result:any)=>{
  if(result.isConfirmed){
    this.spinner.show();
    this.operatingSystemService.DeleteOperatingSystemData(obj.id).subscribe(
      res =>{
        this.response = res;

        if(this.response.success == true){
          this.operatingSystem();
          this.toastr.error(GlobalConstants.deleteSuccess,'Message.');
        }
      }
    );
    this.spinner.hide();
  }
  else {
    this.toastr.error(GlobalConstants.exceptionMessage,'Message .');
    this.spinner.hide();
  }
},err=>{
  if(err.status == 400){
    this.toastr.error(this.response.message,'Message.');
    this.spinner.hide();
  }
})

  }
  editOperatingSystem(row:any,check: any, name:any){
  const modelRef = this.modalService.open(OperatingsystemEditComponent,{centered: true});
  modelRef.componentInstance.Id = row.id;
  modelRef.componentInstance.statusCheck = check;
  modelRef.componentInstance.FormName = name;
  modelRef.result.then((data) => {
    // on close
    this.ngOnInit();
    this.clearData = '';
    if (data == true) {



    }
    }, (reason: any) => {
    // on dismiss
    });
  }
  addOperatingSystem(check: any) {
      const modalRef = this.modalService.open(OperatingsystemEditComponent, { centered: true });
      modalRef.componentInstance.statusCheck = check;
       modalRef.result.then((data: any) => {
        this.ngOnInit();
        this.clearData = '';
      if (data == true) {

      }
    }, (reason) => {
      // on dismiss
    });
  }
  OperatingSystemPdfData(){
    debugger;
    const docName = "OperatingSystem Pdf"
    this.operatingSystemService.OperatingSystemPdfData(this.rows,this.col,docName);
  }
  exportExelUsersListActive() {
    let newRows = this.rows.map((o:any) => {
      return { name: o.name };
    });
    let docName = "Active Users List";
    this.operatingSystemService.OperatingSystemExcelData(newRows, docName);
  }
  searchOperatingSystemData(name: any){
  var obj = name.target.value;
  if(obj == ""){
    this.ngOnInit();
  }
  else{
    this.operatingSystemService.SearchingData(obj).subscribe((res:any)=>{
      this.response = res;
      if(this.response.success == true){
        this.rows = this.response.data.result;
        console.log(this.rows);
        this.spinner.hide();
      }
      else{
        this.toastr.error(this.response.message,'Message.');
        this.spinner.hide();
      }

    })
  }
  }
  getDecodedAccessToken(token: any): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }
  PrintData(){
    debugger;
    let docName = "Operating System";
    this.operatingSystemService.PrintData(this.rows,this.col,docName);
   }
   pageSizes = [5, 10, 20,30]
   pageNumber: number = 1;
   pageSize: number = 10;
   totalPages: any = 0;
   totalRecords: any  ;
   searchText: string = '';
   dataList123: any = []  ;

   searchTerm: string = '';
   loadData() {
    debugger

    var data = this.getDecodedAccessToken(sessionStorage.getItem('Token'));

    this.operatingSystemService.getData(data.UserId,this.pageSize, this.pageNumber, this.dataSearch.name,this.dataSearch.age)
      .subscribe(response => {
        this.dataList123 = response  ;
        this.totalPages = response;
        this.totalRecords = response
      });
  }

  onPrev(): void {
    debugger
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.loadData();
    }
  }

  onNext(): void {
    if (this.pageNumber < this.totalPages.totalPages) {
      debugger
      this.pageNumber++;
      this.loadData();
    }
  }

  goToPage(n: number): void {
    if (n >= 1 && n <= this.totalRecords?.totalRecords ) {
      this.pageNumber = n;
      this.loadData();
    }
  }

  getPages(): number[] {

    let pages: number[] = [];
    let total = Math.ceil(this.totalRecords.totalRecords / this.pageSize);
    let start = Math.max(1, this.pageNumber - 2);
    let end = Math.min(total, this.pageNumber + 2);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }
  private getUnit() {
    const numberPatern = '^[0-9.,]+$';
    return this.formBuilder.group({
      id: ['' ],
      unitName: ['', Validators.required],
      qty: [1, [Validators.required, Validators.pattern(numberPatern)]],
      unitPrice: ['', [Validators.required, Validators.pattern(numberPatern)]],
      deleted: [false]
    });
  }
  addUnit() {
    const control = <FormArray>this.exampleForm.controls['units'];
    control.push(this.getUnit());
  }
  removeUnit(i: any) {
    // const control = <FormArray>this.exampleForm.controls['units'];
    // control.removeAt(i);
    const control = this.exampleForm.get('units') as FormArray;
  let unit :any = control.at(i);
   unit.get('deleted').setValue(true);
  control.removeAt(i);
  }

  pageSizeChanged() {
    this.pageNumber = 1;
    this.loadData();
  }
  searchAge(){
    debugger
    let data = this.dataSearch;
    this.pageNumber = 1;
    this.loadData();
  }
  submitMethid(){
    debugger

    alert(JSON.stringify(this.exampleForm.value))
  }


  SaveData() {

    if(this.exampleForm.get('id').value){
      debugger
      this.employee = {...this.employee ,...this.exampleForm.value}
  this.http.put(environment.urlOperatingSystem + '/UpdateStudents',this.employee).subscribe
  (res=>{
    console.log(res)
  },
  (error:any)=>{
    console.log(error)
  });;

    }
    else{
      debugger
    this.employee = {...this.employee ,...this.exampleForm.value}
  this.http.post(environment.urlOperatingSystem + '/Student',this.employee).subscribe
  (res=>{
    console.log(res)
  },
  (error:any)=>{
    console.log(error)
  });
    }

    }

    studentListData(){
      this.http.get(environment.urlOperatingSystem+ '/StudentList').subscribe
      (res=>{
        this.studentList = res;
      })
    }
    GetData(id: number) {debugger
    this.http.get(environment.urlOperatingSystem + '/studentLIistData/' + id).subscribe
    ((data:any)=>{

      debugger

      this.exampleForm.patchValue({
        name: data.name,
        id:data.id,
        salary: data.salary,
        age: data.age,

      });
      const control = <FormArray>this.exampleForm.controls['units'];
      for (let i = 1; i < data.units.length; i++) {
        control.push(this.getUnit());
      }
      this.exampleForm.patchValue({units: data.units});
    });
    console.log(this.exampleForm.value)
      }


      createpdf(){
        var dd = {
          content: [
              {
                  table: {

                      widths: [530, '*'],
                      body: [
                          [

                                {
                                  text: 'Operating System',
                                 margin: [170, 0,0,0],
                               // Set the background color for the entire row
                                  style: {
                                      color: 'red',  // Set the text color
                                      fontSize: 20   // Set the font size
                                  }
                              },
                               // Empty cell to create the other column
                          ]
                      ]
                  },
                    // Remove table borders if needed
              },

              {text:'Customer Details ' ,	margin: [0, 19,0,20],
                   style: {
                 bold: true,
                decoration: 'underline',
                fontSize: 14, },
              },

              {
                table: {
                  headerRows: 1,
                  widths: [130, 130, 130, 120],
                  body: [
                    ['Name', 'Age', 'Email', 'Fees'],
                    ...this.dataList123.data.map(p => ([p.name, p.age, 'Waheed@gmail.com', '500'])),

                  ]
                }
              },
              {
            columns: [
              {
               text: 'Waheed Ullah',  	margin: [0, 19,0,20],
              },
              {

              },

              {
                  text: 'Waheed Ullah',
                  alignment: 'right',
                  margin: [0, 19,0,20],
              }
            ]
          },
          ]
      };

      const pdfDocGenerator = pdfMake.createPdf(dd).download();

      }



      createpdfDetails(item:any){
        var dd = {
          content: [
              {
                  table: {

                      widths: [530, '*'],
                      body: [
                          [

                                {
                                  text: 'Operating System',
                                 margin: [170, 0,0,0],
                               // Set the background color for the entire row
                                  style: {
                                      color: 'red',  // Set the text color
                                      fontSize: 20   // Set the font size
                                  }
                              },
                               // Empty cell to create the other column
                          ]
                      ]
                  },
                    // Remove table borders if needed
              },

              {text:'Customer Details ' ,	margin: [0, 19,0,20],
                   style: {
                 bold: true,
                decoration: 'underline',
                fontSize: 14, },
              },

              {
                table: {
                  headerRows: 1,
                  widths: [130, 130, 130, 120],
                  body: [
                    ['Name', 'Age', 'Email', 'Fees'],
                    [item.name, item.age, 'Waheed@gmail.com', '500']

                  ]
                }
              },
              {
            columns: [
              { qr:  item.name, foreground: 'red', background: 'yellow' },
              {

              },

              {
                  text: 'Waheed Ullah',
                  alignment: 'right',
                  margin: [0, 19,0,20],
              }
            ]
          },
          {
            text:item.name,style: 'UserDetails',    margin:[0,40,0,0]
          },
        {
          columns:[
  {text:'Name'},
  {text:'Email'},
  {text:'Age'},
 {text:'Salary'},
          ]
        },
        {
          columns:[
  {text:item.name },
  {text:'waheed@gmail.com'},
  {text:item.age},
 {text:'5014',   alignment: 'right',},
          ]
        },
        {

        }
        ,

		{
			style: 'tableExample',
			color: '#444',
			table: {
				widths: [200, 'auto', 'auto'],
				headerRows: 2,
				// keepWithHeaderRows: 1,
				body: [
					[{text: 'Header with Colspan = 2', style: 'tableHeader', colSpan: 2, alignment: 'center'}, {}, {text: 'Header 3', style: 'tableHeader', alignment: 'center'}],
					[{text: 'Header 1', style: 'tableHeader', alignment: 'center'}, {text: 'Header 2', style: 'tableHeader', alignment: 'center'}, {text: 'Header 3', style: 'tableHeader', alignment: 'center'}],
					['Sample value 1', 'Sample value 2', 'Sample value 3'],
					[{rowSpan: 3, text: 'rowSpan set to 3\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor'}, 'Sample value 2', 'Sample value 3'],
					['', 'Sample value 2', 'Sample value 3'],
					['Sample value 1', 'Sample value 2', 'Sample value 3'],
					['Sample value 1', {colSpan: 2, rowSpan: 2, text: 'Both:\nrowSpan and colSpan\ncan be defined at the same time'}, ''],
					['Sample value 1', '', ''],
				]
			}
		},
          ],
          styles: {
            UserDetails: {
              fontSize: 22,
              bold: true,
              color:'pink',
              decoration:'underline',
              alignment: 'center',
              background:'blue'
            },
            anotherStyle: {
              italics: true,
              alignment: 'right',

            },
            tableExample:{
              margin: [0, 0, 0, 10]
            },
          }
      };

      // const pdfDocGenerator = pdfMake.createPdf(dd).download();
      pdfMake.createPdf(dd).open();
      }

      clearBox(){
        this.dataSearch.name = '',
        this.dataSearch.age = ''
      }
}
