import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CartItem } from '@shopping-cart/interfaces/car-tiem.interface';
import { CartService } from '@shopping-cart/services/cart.service';

@Component({
  selector: 'floating-cart',
  imports: [CurrencyPipe, NgClass],
  templateUrl: './floating-cart.component.html',
})
export class FloatingCartComponent implements OnInit {
  private cartService = inject(CartService);
  showCart = false;
  items: CartItem[] = [];
  total = 0;
  totalItems = 0;

  ngOnInit(): void {
    this.cartService.items$.subscribe((items) => {
      this.items = items;
      this.total = this.cartService.getTotal();
      this.totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    });
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }
}
