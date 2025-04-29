import { Route, Routes } from '@angular/router';
import { ProductPageComponent } from './pages/product-page/product-page.component';

export const productsRoutes: Routes = [
  {
    path: '',
    component: ProductPageComponent,
  },
];

export default productsRoutes;
