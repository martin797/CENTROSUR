import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubirInformeComponent } from './pages/subir-informe/subir-informe.component';
import { CuerpoHomeComponent } from './pages/cuerpo-home/cuerpo-home.component';
import { ReporteRegulacionComponent } from './pages/Reportes/Reportes_Regulacion/reporte-regulacion/reporte-regulacion.component';
import { ReporteFiltroVistaComponent } from './pages/Reportes/reporte-filtro-vista/reporte-filtro-vista.component';
import { CompoFiltroVistaComponent } from './pages/Reportes/reporte-filtro-vista/compo-filtro-vista/compo-filtro-vista.component';
import { CompInicialComponent } from './pages/Reportes/Reportes_Regulacion/compo_Inicial/compo_inicial.component';
import { FiltroRegulaComponent } from './pages/Reportes/Reportes_Regulacion/Filtro_regula/filtro_regula.component';
import { CompoFiltroRegulaComponent } from './pages/Reportes/Reportes_Regulacion/Filtro_regula/compo_fitro_regula/compo_filtro_regula.component';
import { ReporteVistaRegulaComponent } from './pages/Reportes/Reportes_Regulacion/reporte_vista_regula/reporte_vista_regula.component';
import { ReporteComponent } from './pages/Reportes/reporte/reporte.component';
import { ReporteDocumentComponent } from './pages/Reportes/reporte-document/reporte-document.component';
import { CompoDocumentComponent } from './pages/Reportes/reporte-document/compo-document/compo-document.component';
import { ReportesGestionComponent } from './pages/Reportes/reportes-gestion/reportes-gestion.component';
import { ReportesRegulacionComponent } from './pages/Reportes/reportes-regulacion/reportes-regulacion.component';
import { ModalComponent } from './pages/Reportes/reporte/modal/modal.component';
import { ProgressCircleModule } from '../../package/progress-circle.module';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
//import { PrimengModule } from '../../package/primeng.module';

@NgModule({
  declarations: [
    CuerpoHomeComponent,
    SubirInformeComponent,
    ReporteRegulacionComponent,
    CompInicialComponent,
    ReporteFiltroVistaComponent,
    FiltroRegulaComponent,
    CompoFiltroRegulaComponent,
    ReporteVistaRegulaComponent,
    CompoFiltroVistaComponent,
    ReporteComponent,
    ReporteDocumentComponent,
    CompoDocumentComponent,
    ReportesGestionComponent,
    ReportesRegulacionComponent,
    ModalComponent
  ],
  exports: [
    CuerpoHomeComponent,
    SubirInformeComponent,
    ReporteRegulacionComponent,
    CompInicialComponent,
    ReporteFiltroVistaComponent,
    FiltroRegulaComponent,
    CompoFiltroRegulaComponent,
    ReporteVistaRegulaComponent,
    CompoFiltroVistaComponent
  ],
  imports: [
    CommonModule,
    ProgressCircleModule,
    BrowserAnimationsModule,
    ToastModule,
    ButtonModule,
    BrowserModule,
    FormsModule,
    RippleModule
    //PrimengModule
  ]
})
export class FacturacionLecturaModule { }