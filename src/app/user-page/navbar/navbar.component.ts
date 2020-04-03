import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { nonAccentVietnamese } from 'src/helpers/helper';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public categoryList: Category[];

  constructor(private productService: ProductService,
    private userService: UserService,
    private categoryService: CategoryService,
    private orderService: OrderService) { }

  public searchResult = [];
  public maxSearchResult = 4;
  public totalSearchResult: number;
  public searchValue: string;
  public showSearchResult = false;

  ngOnInit() {
    this.categoryService.getCategoryList()
      .subscribe(data => this.categoryList = data as Category[]);
    this.orderService.refreshOrderItemList();
    this.productService.refreshProductList();
    this.userService.loadUserProfile();
  }

  onSearchProduct(event) {
    this.showSearchResult = true;
    let searchValue: string = event.target.value;

    if (!this.productService.productList) {
      return;
    }

    searchValue = searchValue.trim().toLowerCase();

    searchValue = nonAccentVietnamese(searchValue);

    if (!searchValue) {
      this.searchResult = [];
      this.maxSearchResult = 4;
      return;
    }

    this.processSearchResult(searchValue);
  }

  processSearchResult(searchValue){
    this.searchResult = [];
    this.totalSearchResult = this.productService.productList.length;
    this.productService.productList.forEach(product => {
      let name: string = nonAccentVietnamese(product.name);
      let provider = (product.provider) ? product.provider.name : "Unknown";
      let category = (product.category) ? product.category.name : "Unknown";

      let providerNonVietnamese: string = nonAccentVietnamese(provider);
      let categoryNonVietnamese: string = nonAccentVietnamese(category);

      if (name.includes(searchValue) || providerNonVietnamese.includes(searchValue) || categoryNonVietnamese.includes(searchValue)) {
        this.searchResult.push(product);
      }      
    });
    this.searchResult = this.searchResult.slice(0, this.maxSearchResult);
  }

  seeMore(e){
    e.preventDefault();
    this.maxSearchResult = this.maxSearchResult + 4;
    this.processSearchResult(this.searchValue);
  }
  
  onSearchBarFocus(){
    if(this.searchValue){
      this.showSearchResult = true;
      this.processSearchResult(this.searchValue);
    }
  }

  onSearchBarBlur(){
    setTimeout(() => {
      this.showSearchResult = false;
    }, 200)
  }

  closeSearchResultList(){
    this.searchResult = [];
    this.searchValue = '';
    this.showSearchResult = false;
  }

  logout(e){
    e.preventDefault();
    this.userService.logout();
  }


}
