import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { Product } from "../models/product.model";
import { environment } from "../environments/environment";
import { ProductSearch } from "../models/productSearch.model";
import { PagedResult } from "../models/pagedResult.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `${environment.apiUrlBase}/v1/products`;

  constructor(private http: HttpClient) {}

  public getProducts(search?: ProductSearch, page: number = 1, pageSize: number = 10): Observable<PagedResult<Product>> {
    let params = new HttpParams()
        .set('page', page)
        .set('pageSize',pageSize);

        if (search) {
            Object.entries(search).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== '') {
                    params = params.set(key, value.toString());
                }
            });
        }
    return this.http.get<PagedResult<Product>>(this.apiUrl, {params});
  }

  public getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  public createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  public updateProduct(
    id: number,
    product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
  ): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, product);
  }

  public deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}