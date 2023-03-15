import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ProductBasketComponent } from './product-basket.component';
import { ProductBasketRoutingModule } from './product-basket-routing.module';

@NgModule({
  imports: [CommonModule, TranslateModule, ProductBasketRoutingModule],
  declarations: [ProductBasketComponent],
})
export class ProductBasketModule {}
