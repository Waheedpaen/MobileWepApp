import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Shared/services/common.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
carList:any=[];
  qty: any ;

  constructor(public _commonSerivces:CommonService,) { }

  ngOnInit(): void {
    this.subTotal()
    this.getCartItemList();
  }

  getCartItemList(){
    if(localStorage.getItem('local')){
     let car:any=[];
     car =   localStorage.getItem('local');
            this.carList =           JSON.parse(car);
            console.log(this.carList)
    }
  }
  inc(obj:any){
    debugger
    for (let index = 0; index < this.carList.length; index++) {
      if(this.carList[index].mobileId === obj.mobileId){
        if(obj.Quantity!=5)
        this.carList[index].Quantity = obj.Quantity + 1;
      }

      }

      localStorage.setItem('local',JSON.stringify(this.carList))
      this.subTotal()
  }
  dec(obj:any){
    debugger
    for (let index = 0; index < this.carList.length; index++) {
      if(this.carList[index].mobileId === obj.mobileId){
        if(obj.Quantity !=1)
        this.carList[index].Quantity= obj.Quantity - 1;
      }
      }
      localStorage.setItem('local',JSON.stringify(this.carList))
     this.subTotal()
  }
  totalSub:any;
  subTotal(){
    if( localStorage.getItem('local')){
      let car:any=[];
      car =   localStorage.getItem('local');
             this.carList =           JSON.parse(car);
    this.totalSub =   this.carList.reduce(function(acc: number,val: {
      price: any;
      Quantity: any; mobilePrice: number; qty: number;
  }){
        return acc + (val.price * val.Quantity)
      },0);
    }
  }

  cartSingleDeleteData(obj:any){
    debugger
    if(localStorage.getItem('local')){
      let car:any=[];
      car =   localStorage.getItem('local');
      this.carList =           JSON.parse(car);
      for (let index = 0; index < this.carList.length; index++) {
        if(this.carList[index].id === obj.id){
          this.carList.splice(index,1);
          localStorage.setItem('local',this.carList)
          this.getCartItemList()
           this.cartNumberFunc();
        }

        }
    }
  }

  cartNumber =0;
  cartNumberFunc(){
    var data:any = localStorage.getItem('local');
    var cartValue = JSON.parse(data);
    this.cartNumber = cartValue.length;
  this._commonSerivces.carSubject.next(this.cartNumber)
  }
}
