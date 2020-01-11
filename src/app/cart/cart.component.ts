import { Component, OnInit,ElementRef, HostListener, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { ShoppinCartService } from '../shared/shoppin-cart.service'
import { Router } from '@angular/router';

interface Products{
  id:any,
  name:any,
  cover:string,
  price:any,
  ratings:any,
  quantity:any,
  added:boolean
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit{
  arraylist:any[]=[];
  total:any = 0;
  addedItems:boolean = false;
  newlist:any;
  searchTerm:any;

  items=[
    {id:'assassins_creed',name:'Assassins Creed',cover:'assets/img/assassins.jpg',price:400,ratings:2.5,quantity:1,added:false},
    {id:'far_cry3',name:'Far Cry 3',cover:'assets/img/far-cry-3.jpg',price:300,ratings:3.5,quantity:1,added:false},
    {id:'far_cry4',name:'Far Cry 4',cover:'assets/img/far-cry-4.jpg',price:200,ratings:4.5,quantity:1,added:false},
    {id:'far_cry5',name:'Far Cry 5',cover:'assets/img/far-cry-5.jpg',price:900,ratings:5,quantity:1,added:false},
    {id:'gta_5',name:'GTA 5',cover:'assets/img/gta_5.jpg',price:400,ratings:1.5,quantity:1,added:false},
    {id:'gta_4',name:'GTA 4',cover:'assets/img/gta_4.jpg',price:300,ratings:1.5,quantity:1,added:false},
    {id:'hitman',name:'Hitman',cover:'assets/img/hitman.jpg',price:200,ratings:3,quantity:1,added:false},
    {id:'hitman2',name:'Hitman 2',cover:'assets/img/hitman2.jpg',price:300,ratings:4,quantity:1,added:false},
    {id:'max_payen3',name:'Max Payne 3',cover:'assets/img/max_payen3.jpg',price:700,ratings:5,quantity:1,added:false},
    {id:'breakpoint',name:'Breakpoint',cover:'assets/img/ghost-recon-breakpoint.jpg',price:1200,ratings:4,quantity:1,added:false},
    {id:'wildlands',name:'Wild Lands',cover:'assets/img/ghost-recon-wildlands.jpg',price:1000,ratings:3,quantity:1,added:false},
    {id:'blackops4',name:'Black Ops 4',cover:'assets/img/codblackops4.jpg',price:1000,ratings:3,quantity:1,added:false}
  ]
  
  

  constructor(private cartService:ShoppinCartService,private router:Router) { }
  
  @ViewChild('stickyMenu',{static: false}) menuElement: ElementRef;
  sticky: boolean = false;
  //elementPosition: any;

  @HostListener('window:scroll', ['$event'])
  handleScroll(){
    const windowScroll = window.pageYOffset;
    if(windowScroll >= 50){
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }
 

  /**
   * Method to Add product
   */


  additem(btn,i){
    this.addedItems = true
    this.arraylist.push(this.items[i]);
    btn.added = true
    this.cartService.setProduct(this.arraylist)
    this.total = this.arraylist.length;
  }
 
  /**
   * Method to Show Checkout 
   * Button if cart is not empty
   */
  itemsCart(){
    if(this.arraylist.length <= 0){
      this.addedItems = false
    }else{
      this.addedItems = true
    }
  }

  /**
   * Method to Remove product
   */
  removeitem(id,i){
    this.arraylist = this.cartService.getProducts()
    i.added = false;
    for(i = 0; i < this.arraylist.length; i++) {
      if(this.arraylist[i].id == id) {
        this.arraylist.splice(i, 1);
      }
    }
    this.cartService.setProduct(this.arraylist);
    this.total = this.arraylist.length;
    this.itemsCart();
  }


  /**
   * Sorting Methods
   */
  filterByPrice(){
    this.items.sort((a:any, b:any) => {
      return a.price - b.price;
    });
  }
  filterByAlphabet(){
    this.items.sort((a,b)=>a.name.localeCompare(b.name));
  }
  filterByRatings(){
    this.items.sort((a:any, b:any) => {
      return b.ratings - a.ratings;
    });
  }
 

  getItems(){
    this.newlist= this.cartService.getProducts();
    for(var i=0; i<this.newlist.length; i++){
      for(var j=0; j<this.items.length;j++){
        if(this.newlist[i].id== this.items[j].id){
          this.items[j]=this.newlist[i];
        }
        else{
          this.items;
        }
      }
    }
  }

  ngOnInit() {
    this.filterByPrice()
    if (localStorage.getItem("products") != null) {
      this.getItems();
      this.arraylist = this.cartService.getProducts()  
      this.total = this.arraylist.length; 
      this.itemsCart();
    }
   
  }

}

@Pipe({
  name:'productFilter'
})

export class ProductFilter implements PipeTransform{
  transform(product:Products[],searchTerm:string):Products[]{
    if(!product || !searchTerm){
      return product
    }
    return product.filter(val=>val.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
  }
}

