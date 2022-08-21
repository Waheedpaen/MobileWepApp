import { Injectable } from '@angular/core';
import { BrandRepositoryService } from 'src/app/admin/brand/services/brand-repository/brand-repository.service';
import { OrderRepositoryService } from '../order-repository/order-repository.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(public orderRepositoryService: OrderRepositoryService) { }


  AddUserOrder(UserId: number, OrderList: any){
    return this.orderRepositoryService.AddUserOrder(UserId,OrderList)
  }
}
