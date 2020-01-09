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
  setProduct(id:any) {
    localStorage.setItem("products", JSON.stringify(id));     
  }
  getProducts() {
    return JSON.parse(localStorage.getItem("products"))
  }
  removeProduct(arrayList:any) {
    localStorage.setItem("products", JSON.stringify(arrayList)); 
  }
  


  
  

  

   
   
}




