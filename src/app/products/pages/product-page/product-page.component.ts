import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductTableComponent } from '@products/components/product-table/product-table.component';
import { ProductService } from '@products/services/product.service';
import { PaginationService } from '@products/shared/components/pagination/pagination.service';
import { FloatingCartComponent } from '@shopping-cart/components/floating-cart/floating-cart.component';

@Component({
  selector: 'app-product-page',
  imports: [ProductTableComponent, FloatingCartComponent],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {
  activatedRoute = inject(ActivatedRoute);
  paginationService = inject(PaginationService);
  productsServices = inject(ProductService);
  productIdSlug: string = this.activatedRoute.snapshot.params['idSlug'];
  productsPerPage = signal(10);

  productResource = rxResource({
    request: () => ({
      page: this.paginationService.currentPage() - 1,
      limit: this.productsPerPage(),
    }),
    loader: ({ request }) => {
      return this.productsServices.getProducts({
        offset: request.page * 9,
        limit: request.limit,
      });
    },
  });
}
