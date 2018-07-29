import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

import { GAWrapper } from '~/shared/google-analytics';

import { InputNumberDirective } from '~/core/directives/input-number.directive';
import { PhoneInputDirective } from '~/core/directives/phone-input.directive';

import { FormatPhonePipe } from '~/core/pipes/format-phone.pipe';
import { HasErrorPipe } from '~/core/pipes/has-error.pipe';
import { PricePipe } from '~/core/pipes/price.pipe';

import { MadeHeaderComponent } from '~/core/components/made-header/made-header.component';

const declarations = [
  InputNumberDirective,
  PhoneInputDirective,
  FormatPhonePipe,
  HasErrorPipe,
  PricePipe,
  MadeHeaderComponent
];

@NgModule({
  declarations: [
    ...declarations
  ],
  exports: [
    ...declarations
  ],
  imports: [
    IonicModule
  ],
  providers: [
    GoogleAnalytics,
    GAWrapper
  ]
})
export class CoreModule {}