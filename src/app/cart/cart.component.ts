import { Component, OnInit, Directive, HostListener } from '@angular/core';
import { ShoppinCartService } from '../shared/shoppin-cart.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
@Directive({selector: 'button[counting]'})
export class CartComponent implements OnInit {

  constructor(private cartService:ShoppinCartService,private router:Router) { }
  arraylist:any[]= [];
  items=this.cartService.items;
  total:any = this.cartService.total;
  addedItems:boolean = false;
  totalprice:number;
  btnText = 'Add To Cart'

  /**
   * Method to Add product
   */
  additem(i){
    this.addedItems = true;
    document.getElementById("cartBtn-"+i).innerHTML = document.getElementById("cartBtn-"+i).innerHTML == "Add To Cart" ? "Added To Cart" : "Added To Cart";
    //this.arraylist.push({name:this.items[i].name,price:this.items[i].price,cover:this.items[i].cover})
    for(var j = 0; j < this.items.length; j++){
      if(this.arraylist.indexOf(this.items[i]) == -1){
      this.arraylist.push(this.items[i]);
      this.totalprice = this.arraylist.reduce((acc, val) => acc += val.price, 0)
      this.total = this.arraylist.length;
      }
    }
  }

  /**
   * Method to Remove product
   */
  removeitem(i){
    this.arraylist.splice(i,1)
    this.total = this.arraylist.length
    this.totalprice = this.arraylist.reduce((acc, val) => acc += val.price, 0)
    if(this.arraylist.length <= 0){
      this.addedItems = false;
    }
  }

  /**
   * Method to pass product Details and navigate to Checkout
   */
  checkout(){
    this.router.navigate(['/','checkout'])
    this.productList();
  }
  productList(){
    this.cartService.productList(this.arraylist);        
  }


  /**
   * Sorting Methods
   */
  filterByPrice(){
    this.cartService.filterByPrice();
  }
  filterByAlphabet(){
    this.cartService.filterByAlphabet();
  }
  filterByRatings(){
    this.cartService.filterByRatings();
  }
  ngOnInit() {
    
  }

  

}

