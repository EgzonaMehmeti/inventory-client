import { Routes } from '@angular/router';
import { ProductsListComponent } from '../../inventory-client/src/components/productsListComponent/products-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: 'products', component: ProductsListComponent },
];
