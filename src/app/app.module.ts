import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRouterModule } from './app-router.module';

import { AppComponent } from './app.component';
import { SharedModule } from './reportes/shared/shared.module';
import { FacturacionLecturaModule } from './reportes/facturacion-lectura/facturacion-lectura.module';
import { CollectionService } from './reportes/facturacion-lectura/service/collection.service';
import { DataTransfer } from './reportes/facturacion-lectura/service/transfer.service';
import { LocalstorageService } from './reportes/facturacion-lectura/service/localstorage.service';
import { ApiRestService } from './reportes/facturacion-lectura/service/apiRest.service';
import { FilterService } from './reportes/facturacion-lectura/service/filter.service';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRouterModule,
    SharedModule,
    FacturacionLecturaModule
  ],
  providers: [ //Servicios a ejecutar
    CollectionService,
    FilterService,
    DataTransfer,
    ApiRestService,
    LocalstorageService,
    ConfirmationService,
    MessageService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
