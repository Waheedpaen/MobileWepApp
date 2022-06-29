import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BasicModule } from './basic.module';
import { MaterialModule } from './material.module';
import { PrimeModule } from './prime.module';



@NgModule({

  imports:[
FormsModule,
CommonModule,
  ],
  exports: [
    MaterialModule,
    PrimeModule,
    BasicModule,
      NgxSpinnerModule,
    NgxDatatableModule,
    NgxDatatableModule
  ],

})
export class SharedModule {
}
