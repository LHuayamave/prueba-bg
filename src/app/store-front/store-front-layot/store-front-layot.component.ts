import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FrontNavbarComponent } from '@store-front/front-navbar/front-navbar.component';

@Component({
  selector: 'app-store-front-layot',
  imports: [FrontNavbarComponent, RouterOutlet],
  templateUrl: './store-front-layot.component.html',
})
export class StoreFrontLayotComponent {}
