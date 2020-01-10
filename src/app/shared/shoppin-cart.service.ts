import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppinCartService {
  

  constructor() { }
 


  setUserData(value: any) {
    localStorage.setItem('userdetails', JSON.stringify(value))
  }
  getUserData() {
    return  JSON.parse(localStorage.getItem("userdetails"))
  }
  setProduct(value:any) {
    localStorage.setItem("products", JSON.stringify(value));     
  }
  getProducts() {
    return JSON.parse(localStorage.getItem("products"))
  }
  totalValue(value:any) {
    localStorage.setItem("totalValue", JSON.stringify(value)); 
  }
  // removeProduct(value:any) {
  //   localStorage.setItem("products", JSON.stringify(value)); 
  // }
  
   
}




