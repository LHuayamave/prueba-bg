import { CurrencyPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Product } from '@products/interfaces/products.interfaces';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';
import { CartService } from '@shopping-cart/services/cart.service';

@Component({
  selector: 'app-product-table',
  imports: [ProductImagePipe, CurrencyPipe],
  templateUrl: './product-table.component.html',
})
export class ProductTableComponent {
  products = input.required<Product[]>();
  cartService = inject(CartService);

  addProductToCart(product: Product, quantityInput: HTMLInputElement) {
    const quantity = parseInt(quantityInput.value, 10);

    if (isNaN(quantity) || quantity <= 0) {
      alert('Por favor ingresa una cantidad válida');
      return;
    }

    this.cartService.addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0] ?? '',
      quantity,
    });

    quantityInput.value = ''; // Limpiar campo
  }
}
