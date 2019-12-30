import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppinCartService {

  constructor() { }

  private userIdSource = new BehaviorSubject<any>('');
  currentUser = this.userIdSource.asObservable();

  private productSource = new BehaviorSubject<any>('');
  currentProducts = this.productSource.asObservable();
  
  setUser(value: any) {
    this.userIdSource.next(value)
  }
  productList(value: any) {
    this.productSource.next(value)
  }
  
  arraylist:any[]=[];
  total:any;
  totalprice:number = 0;
  items=[
    {id:'assassins_creed',name:'Assassins Creed',cover:'assets/img/assassins.jpg',price:400,ratings:2.5,quantity:1},
    {id:'far_cry3',name:'Far Cry 3',cover:'assets/img/far-cry-3.jpg',price:300,ratings:3.5,quantity:1},
    {id:'far_cry4',name:'Far Cry 4',cover:'assets/img/far-cry-4.jpg',price:200,ratings:4.5,quantity:1},
    {id:'far_cry5',name:'Far Cry 5',cover:'assets/img/far-cry-5.jpg',price:900,ratings:5,quantity:1},
    {id:'gta_5',name:'GTA 5',cover:'assets/img/gta_5.jpg',price:400,ratings:1.5,quantity:1},
    {id:'gta_4',name:'GTA 4',cover:'assets/img/gta_4.jpg',price:300,ratings:1.5,quantity:1},
    {id:'hitman',name:'Hitman',cover:'assets/img/hitman.jpg',price:200,ratings:3,quantity:1},
    {id:'max_payen3',name:'Max Payne 3',cover:'assets/img/max_payen3.jpg',price:700,ratings:5,quantity:1}
  ]

  // additem(i){
  //   this.arraylist.push({name:this.items[i].name,price:this.items[i].price})
  //   this.total = this.arraylist.length
  //   this.totalprice = this.arraylist.reduce((acc, val) => acc += val.price, 0)
  // }

  
  
  /**
   * Filter by Alphabet Orders
   */
  filterByAlphabet(){
    this.items.sort((a,b)=>a.name.localeCompare(b.name));
  }
  /**
   * Filter by price function
   */
  filterByPrice(){
    this.items.sort((a:any, b:any) => {
      return a.price - b.price;
    });
  }
  /**
   * Filter by ratings function
   */
  filterByRatings(){
    this.items.sort((a:any, b:any) => {
      return a.ratings - b.ratings;
    });
  }
  

   
   
}




