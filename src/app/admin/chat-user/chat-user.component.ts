import { ChangeDetectorRef, Component } from '@angular/core';
import { HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { HttpClient } from '@angular/common/http';
import { EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css']
})
export class ChatUserComponent  implements OnInit  {
  files: any = [];
  response: any;
  usersListAll: any = {};
  allGroups: any = [];
  singleUserForChat: any;
  messagess: any = [];
  message = null;
  groupIds = null;
  senderId: any;
  response1: any;
  Url:any;
  data: any = {};
  userRoleForDisplay: any;
  schoolName: any;
  singleuseridtomessage: any;
  newdata: any;
  connected: any;
  userConnection: any;
  clickeduserId: any;
  isActiveUser: any;
  groupId: any = {};
  groupsTab: any;
  searchTerm = null;
  messageLengthstart: any;
  temp = [];
  temp1 = [];
  roomNameCheck:any;
  private hubConnection: HubConnection |any;
  constructor(
  private cd: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router,
     ) {


    // this.signalRService.getMessage().subscribe(message => {
    //   this.newdata= message;
    //   this.responceforchat();
    //   console.log(message);
    // });
  }


  getUsersListForMessage() {
    let that = this;
    that.http
      .get(`${''}/api/Messages/GetUsersForChat`)
      .subscribe(res => {
        this.response = res;
        if (this.response.success == true) {
          this.usersListAll = this.response.data;
          for (let i = 0; i < this.usersListAll.length; i++) {
            this.usersListAll[i].messageRecived = false;
          }
          //  this.Url = this.usersListAll.photos[0].url;

        }
        else {
          this.toastr.error(this.response.message, 'Message.');
        }
      }, err => {
        if (err.status == 400) {
          this.toastr.error('Something went Worng', 'Message.');
        }

      });
  }

  onClickSingleUser(user:any, index:any) {
    let that = this;
    this.groupId = user.id;
    if (user.userIds.length == 1) {
      this.clickeduserId = user.userIds[0];

    }
    else {
      this.clickeduserId = user.userIds;
    }
    let newList = this.usersListAll
    newList[index].messageRecived = false;
    this.usersListAll = [];
    this.usersListAll = newList; 
    let varr = {

      "userIds": user.userIds,

    }
    that.http
      .post(`${''}/api/Messages/GetGroupChatMessages`, varr)
      .subscribe(res => {
        this.response = res;
        if (this.response.success == true) {
          this.isActiveUser = true;
          this.singleUserForChat = this.response.data.userToDetails[0].fullName;
          this.singleuseridtomessage = this.response.data.userToDetails[0].id;
          this.messagess = this.response.data.messages;
          this.messageLengthstart = this.messagess.length;
          // this.ngAfterViewInit();
          // this.scrool();
          // this.Url = this.response.data.userToDetails.photos[0].url;



        }
        else {
          this.toastr.error(this.response.message, 'Message.');
        }
      }, err => {
        if (err.status == 400) {
          this.toastr.error('Something went Worng', 'Message.');
        }

      });
  }


  startConnection = () => {
    this.hubConnection = new HubConnectionBuilder()
    //.withUrl('http://localhost:60919/notificationHub',
    .withUrl(`${''}/notificationHub`,
      {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
    .build();
  this.hubConnection
    .start()
    .then(() => localStorage.setItem('Connection', 'Connected'))
    .catch((err: any) => localStorage.setItem('Connection', 'Disconnected' + err))

}
public addTransferChartDataListener = () => {
  return this.hubConnection.on('MessageNotificationAlert', (res: any) => {
    this.newdata = res;

    /** spinner ends after 5 seconds */


    //  this.eventCallback.next(this.data1);
    // console.log(data);
    // return this.data;

  });
}

ngOnInit(): void {
  this.userRoleForDisplay = localStorage.getItem('role');

}

}
