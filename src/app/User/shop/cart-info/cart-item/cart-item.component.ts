import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
carList:any=[];
  qty: any ;

  constructor() { }

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
    for (let index = 0; index < this.carList.length; index++) {
      if(this.carList[index].id === obj.id){
        if(obj.qty!=5)
        this.carList[index].qty = obj.qty + 1;
      }

      }

      localStorage.setItem('local',JSON.stringify(this.carList))
      this.subTotal()
  }
dec(obj:any){
  for (let index = 0; index < this.carList.length; index++) {
    if(this.carList[index].id === obj.id){
      if(obj.qty !=1)
      this.carList[index].qty = obj.qty - 1;
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
  this.totalSub =   this.carList.reduce(function(acc: number,val: { mobilePrice: number; qty: number; }){
      return acc + (val.mobilePrice * val.qty)
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
      }

      }
  }
}
}
