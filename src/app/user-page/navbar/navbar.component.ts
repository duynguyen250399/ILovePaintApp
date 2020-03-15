import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public categoryList: Category[];

  constructor(private categoryService: CategoryService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.categoryService.getCategoryList()
    .subscribe(data => this.categoryList = data as Category[]);
    this.orderService.refreshOrderItemList();
  }

}
