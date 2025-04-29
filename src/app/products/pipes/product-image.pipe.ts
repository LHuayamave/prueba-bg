import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.api_url;

@Pipe({
  name: 'productImage',
})
export class ProductImagePipe implements PipeTransform {
  transform(value: null | string | string[]): string {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return './assets/images/no-image.jpg'; // Corregido el path
    }

    let image: string | null = null;

    if (typeof value === 'string') {
      image = value;
    } else if (Array.isArray(value)) {
      image = value[0] ?? null;
    }

    if (!image) {
      return './assets/images/no-image.jpg';
    }

    // Si ya es una URL completa, la devolvemos sin modificar
    if (image.startsWith('http') || image.startsWith('blob:')) {
      return image;
    }

    // Si es un nombre de archivo, construimos la URL relativa a tu backend
    return `${baseUrl}/files/product/${image}`;
  }
}
