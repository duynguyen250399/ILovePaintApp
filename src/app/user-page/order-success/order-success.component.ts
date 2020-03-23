import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

  constructor(private router: Router) { }
  public seconds: number = 5;

  ngOnInit() {
    setInterval(() =>{
      this.seconds = this.seconds - 1;
      if(this.seconds === 0){
        this.router.navigate(['/']);
      }
    }, 1000);
  }

}
