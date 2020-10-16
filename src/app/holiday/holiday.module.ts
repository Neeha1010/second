import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HolidayPageRoutingModule } from './holiday-routing.module';

import { HolidayPage } from './holiday.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HolidayPageRoutingModule
  ],
  declarations: [HolidayPage]
})
export class HolidayPageModule {}
