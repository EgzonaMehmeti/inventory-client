import { Component, OnInit } from "@angular/core";
import { Product } from "../../models/product";
import { ProductService } from "../../services/product.service";

import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'products-list',
    templateUrl: 'products-list.component.html',
    standalone: true,
    styleUrls: ['./products-list.component.scss'],
    imports: []
})
export class ProductsListComponent implements OnInit {

    displayedColumns: string[] = ['id', 'displayName', 'price', 'actions'];
    dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>();
    products: Product[] = [];

    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.productService.getAll().subscribe({
      next: (products) => {
        this.products = products;
        console.log('Products:', products);
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }
}