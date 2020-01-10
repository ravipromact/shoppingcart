import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ShoppinCartService } from '../shared/shoppin-cart.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  userId:any;
  itemsList:any
  arraylist:any;
  totalprice:number = 0;
  orderPlaced:boolean = false;
  loader:boolean = false;
  itemsAdded:boolean
  constructor(private cartService:ShoppinCartService,private router:Router) {}

  ngOnInit() {
    /**
      * To initialize form values
      */
    if (localStorage.getItem("userdetails") != null) {
      this.itemsList = this.cartService.getUserData()
    }

    /**
      * To initialize product details
      */
   
    if (localStorage.getItem("products") != null) {
      this.arraylist = this.cartService.getProducts()
      if(this.arraylist.length<=0){
        this.itemsAdded = false
      }else{this.itemsAdded = true}
      /**
        * To initialize cart value
        */
      this.totalprice = this.arraylist.reduce((acc, val) => acc += val.price, 0)
    }

 }


  
  /**
    * Method to place Order 
    */
  placeOrder(){    
    this.loader = true
    setTimeout(()=>{   
      this.orderPlaced = true
      this.loader = false
      localStorage.removeItem('products')
      localStorage.removeItem('userdetails')
    }, 1500);

    setTimeout(()=>{this.router.navigate(['/','signup'])},3000)
    
  }
 
  removeitem(id,i){
    for(i = 0; i < this.arraylist.length; i++) {
      if(this.arraylist[i].id == id) {
        this.arraylist.splice(i, 1);
        this.cartService.setProduct(this.arraylist)
      }
    }
    if(this.arraylist.length<=0){
      this.itemsAdded = false
    }else{this.itemsAdded = true}
    this.totalprice = this.arraylist.reduce((acc, val) => acc += val.price, 0)
    this.arraylist = this.cartService.getProducts()   
  }

  @ViewChildren('items') items: QueryList<ElementRef>;
  
  callType(value,i){
    
    console.log(this.totalprice)

    //console.log(i,value * this.arraylist[i].price)
    //this.totalprice = value * this.arraylist[i].price
    //this.totalprice = this.arraylist.reduce((acc) => acc+=this.arraylist[i].price * value, 0)
    // var asd = price * value
    // this.itemsList.map(tag => tag.price).reduce((a, b) => a + b, 0);
    // this.totalprice = this.message.reduce((value, price) => value += val.price, 0)
    // for(i=0;i<this.products.length;i++){
    //   this.totalprice = 
    // }
  }

}
