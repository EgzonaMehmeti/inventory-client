import { Component, OnInit, ViewChild } from "@angular/core";
import { Product } from "../../models/product.model";
import { ProductService } from "../../services/product.service";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule, DatePipe } from '@angular/common';
import { ProductSearch } from "../../models/productSearch.model";

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FilterProductsComponent } from "./filterProducts/filter-products.component";
import { AddEditProductComponent } from "./addEditProduct/add-edit-product.component";

@Component({
    selector: 'products-list',
    templateUrl: 'products-list.component.html',
    standalone: true,
    styleUrls: ['./products-list.component.scss'],
    imports: [MatTableModule, MatPaginatorModule, MatInputModule, MatSortModule, MatButtonModule,
            MatIconModule, MatDialogModule, CommonModule]
})
export class ProductsListComponent implements OnInit {

    displayedColumns: string[] = ['id', 'name', 'price', 'category', 'quantityInStock', 'actions'];
    dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>();
    public name = '';
    public category = '';

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private productService: ProductService,
                private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.loadProducts();
  }

  loadProducts(search?: ProductSearch, page: number = 1, pageSize: number = 10) {
    this.productService.getProducts(search, page, pageSize).subscribe(res => {
      this.dataSource.data = res.items;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filterProducts(){
    var title = 'Filter Products';
    var dataForDialog =  {
      title,
      name: this.name,
      category: this.category
    }
    const dialogRef = this.dialog.open(FilterProductsComponent, {
      data: dataForDialog
    });
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.name = res.name;
        this.category = res.category;
        this.productService.getProducts(res).subscribe(res => {
        this.dataSource.data = res.items;
        });

        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
          }
      }
    })
  }
  public onSortChange() {
    this.loadProducts(
      undefined,
      this.paginator.pageIndex + 1,
      this.paginator.pageSize
    );
  }
  onPageChange() {
    this.loadProducts(
      undefined,
      this.paginator.pageIndex + 1,
      this.paginator.pageSize
    );
  }

  public addEditProduct(type: string, product?: Product, productId?: any){
    var title = (type == 'edit') ? 'Edit Employee' : 'Add Employee';
    var message = 'Fill the necessary data';
    var dataForDialog = (type == 'edit') ? {
      product,
      title,
      message,
      type
    } : {
      title,
      message,
      type
    }
    const dialogRef = this.dialog.open(AddEditProductComponent, {
      data: dataForDialog
    });
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        if(type == 'edit'){
          this.productService.updateProduct(productId, res.data).subscribe(res1=>{
            this.loadProducts();
          });
        }else if(type == 'add'){
          this.productService.createProduct(res.data).subscribe(res1=>{
            this.loadProducts();
          });
        }
      }
    })
  }

  public deleteProduct(product: Product){
    this.productService.deleteProduct(product.id).subscribe(res1=>{
          this.loadProducts();
        });
  }
  }
  