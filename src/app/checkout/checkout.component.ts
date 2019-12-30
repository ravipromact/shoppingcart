import { Component, OnInit, Input, SimpleChanges, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { ShoppinCartService } from '../shared/shoppin-cart.service'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private cartService:ShoppinCartService) { }

  userId:any;
  itemsList:any
  products:any;
  totalprice:number = 0;
  orderPlaced:boolean = false;
  loader:boolean = false;
  ngOnInit() {
    /**
      * To initialize form values
      */
    this.getUserDetails();

    /**
      * To initialize product details
      */
    this.cartService.currentProducts.subscribe(value => this.products = value )

    /**
      * To initialize cart value
      */
    this.totalprice = this.products.reduce((acc, val) => acc += val.price, 0)
 }

  /**
    * To subscribe currentUser Observable 
    * in shopping-cart service to get form values
    */
  getUserDetails() {
    this.cartService.currentUser.subscribe(item => {
      this.itemsList = item
    }, err => {
      console.log(err);
    });
  }

  /**
    * Method to place Order 
    */
  placeOrder(){    
    this.loader = true
    setTimeout(()=>{    //<<<---    using ()=> syntax
      this.orderPlaced = true
      this.loader = false
    }, 3000);
    
  }
  // removeitem(i){
  //   this.message.splice(i,1)
  //   this.totalprice = this.message.reduce((acc, val) => acc += val.price, 0)
  // }
  // @ViewChildren('items') items: QueryList<ElementRef>;
  
  // callType(value,price,i){
  //   var asd = price * value
  //   this.itemsList.map(tag => tag.price).reduce((a, b) => a + b, 0);
  //   this.totalprice = this.message.reduce((value, price) => value += val.price, 0)
  // }

}
