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
      //console.log(localStorage.getItem('totalValue'))
      
      if(this.arraylist.length<=0){
        this.itemsAdded = false
      }else{this.itemsAdded = true}
      /**
        * To initialize cart value
        */
      //this.totalprice = this.arraylist.reduce((acc, val) => acc += val.price, 0)
      //this.totalprice = this.arraylist * this.arraylist.quantity

      for(var i=0;i<this.arraylist.length;i++){
        this.totalprice+=this.arraylist[i].price * this.arraylist[i].quantity        
      }

      
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

  //@ViewChildren('items') items: QueryList<ElementRef>;
  
  callType(obj,value){
    var newlist = this.cartService.getProducts();
    this.arraylist.forEach(el => {
      if(el.id === obj.id){
        let oldQuantity = el.quantity;
        el.quantity = parseInt(value);        
        this.totalprice -= (oldQuantity*el.price);
        //this.totalprice += (el.quantity*el.price); 
        this.totalprice += (el.quantity*el.price)        
        //this.cartService.totalValue()
        for(var i = 0;i<newlist.length;i++){
          if(newlist[i].id == obj.id){
            newlist[i] = obj
            this.cartService.setProduct(newlist)           
          }
        } 
      }    
    });    
  }


}
