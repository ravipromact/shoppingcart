import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { ShoppinCartService } from '../shared/shoppin-cart.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private cartService:ShoppinCartService,private router:Router) { }
  firstname:string;
  lastname:string;
  email:string;
  address:any;
  city:string;
  contact:number;
  dataArray:any[] = [];
  nodigit:boolean;
  /**
   * Captures values of form on submit 
   * and passes into dataArray
   */
  onSubmit(signupForm:NgForm) {
    this.firstname = signupForm.control.get('firstname').value;
    this.lastname = signupForm.control.get('lastname').value;
    this.email = signupForm.control.get('email').value;
    this.address = signupForm.control.get('address').value;
    this.city = signupForm.control.get('city').value;
    this.contact = signupForm.control.get('contact').value;
    this.cartService.setUserData(signupForm.value)
    this.router.navigate(['/','home'])
  } 
  onlyDigit(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);    
    if(!pattern.test(inputChar) && event.charCode != '0') {
      event.preventDefault();
      this.nodigit = true
    }else{this.nodigit = false}
  }
  ngOnInit() {    
    document.body.classList.add("signup");
  }
  ngOnDestroy(){
    document.body.classList.remove("signup");
  }

}
