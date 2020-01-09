import { Component } from '@angular/core';
import { ShoppinCartService } from './shared/shoppin-cart.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ShoppingCart';
  total:any;
  arraylist:any[]=[];
  constructor(private cartService:ShoppinCartService) { }
  onVoted(total: any) {
    this.total = total;
  }
  ngOnInit(){
  // this.onVoted();
  }
}
