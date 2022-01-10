import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuerpoHomeComponent } from './reportes/facturacion-lectura/pages/cuerpo-home/cuerpo-home.component';

import { ReporteRegulacionComponent } from './reportes/facturacion-lectura/pages/Reportes/Reportes_Regulacion/reporte-regulacion/reporte-regulacion.component';
import { SubirInformeComponent } from './reportes/facturacion-lectura/pages/subir-informe/subir-informe.component';
import { ReporteFiltroVistaComponent } from './reportes/facturacion-lectura/pages/Reportes/reporte-filtro-vista/reporte-filtro-vista.component';
import { FiltroRegulaComponent } from './reportes/facturacion-lectura/pages/Reportes/Reportes_Regulacion/Filtro_regula/filtro_regula.component';
import { ReporteVistaRegulaComponent } from './reportes/facturacion-lectura/pages/Reportes/Reportes_Regulacion/reporte_vista_regula/reporte_vista_regula.component';
import { ReporteComponent } from './reportes/facturacion-lectura/pages/Reportes/reporte/reporte.component';
import { ReportesGestionComponent } from './reportes/facturacion-lectura/pages/Reportes/reportes-gestion/reportes-gestion.component';
import { ReportesRegulacionComponent } from './reportes/facturacion-lectura/pages/Reportes/reportes-regulacion/reportes-regulacion.component';

const routes: Routes = [
  {
    path: '',
    component: CuerpoHomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'subir_informe',
    component: SubirInformeComponent
  },
  {
    //path: 'document_informe',
    path: 'reportes_gestion',
    component: ReportesGestionComponent
  },
  //Hacer hija estas rutas
  {
    path: 'filtros',
    component: ReporteFiltroVistaComponent
  },
  {
    path: 'document_informe',
    component: ReporteComponent
  },
  //Reportes de Regulación
  {
    path: "reportes_regulacion",
    component: ReportesRegulacionComponent
  },
  {
    path: 'repor-regulacion',
    component: ReporteRegulacionComponent
  },
  {
    path: 'ver_informe_regu',
    component: FiltroRegulaComponent
  },
  {
    path: 'document_informe_regula',
    component: ReporteVistaRegulaComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
]


@NgModule({
  declarations: [],
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRouterModule { }
