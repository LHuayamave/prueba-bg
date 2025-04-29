import { Injectable } from '@angular/core';
import { CartItem } from '@shopping-cart/interfaces/car-tiem.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  items$ = this.itemsSubject.asObservable();

  addItem(product: CartItem): void {
    const items = this.itemsSubject.getValue();
    const existing = items.find((p) => p.id === product.id);

    if (existing) {
      existing.quantity += product.quantity;
    } else {
      items.push({ ...product });
    }

    this.itemsSubject.next([...items]);
  }

  getTotal(): number {
    return this.itemsSubject
      .getValue()
      .reduce((total, item) => total + item.price * item.quantity, 0);
  }

  getItems(): CartItem[] {
    return this.itemsSubject.getValue();
  }

  clear(): void {
    this.itemsSubject.next([]);
  }
}
