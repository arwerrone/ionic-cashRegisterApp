import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestokePageRoutingModule } from './restoke-routing.module';

import { RestokePage } from './restoke.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestokePageRoutingModule
  ],
  declarations: [RestokePage]
})
export class RestokePageModule {}
