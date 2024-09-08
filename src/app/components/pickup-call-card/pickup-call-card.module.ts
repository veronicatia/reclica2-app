import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';
import { PickupCallCardComponent } from './pickup-call-card.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [PickupCallCardComponent]
  ,
  declarations: [PickupCallCardComponent]
})
export class PickupCallCardModule {}
