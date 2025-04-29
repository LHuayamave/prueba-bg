import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '@products/interfaces/products.interfaces';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}
@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);

  baseUrl = environment.api_url;
  private productsCache = new Map<string, Product[]>();

  getProducts(options: Options): Observable<Product[]> {
    const { limit = 9, offset = 0, gender = '' } = options;
    const key = `${limit}-${offset}-${gender}`;

    if (this.productsCache.has(key)) {
      return of(this.productsCache.get(key)!);
    }

    return this.http
      .get<Product[]>(`${this.baseUrl}/products`)
      .pipe(tap((res) => this.productsCache.set(key, res)));
  }
}
