import { Component, OnInit, enableProdMode } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { DataTransfer } from '../../../service/transfer.service';
import { CollectionService } from '../../../service/collection.service';
import { FilterService } from '../../../service/filter.service';
import { Documento } from '../../../../interfaces/documentos';
import { Filtro } from '../../../../interfaces/filtros';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent {

  url: string = '/filtros';
  data_actual = this.dataTransfer.getFilter();
  tipo_reporte: string = "";
  doc_actual: Documento = {
    nombre: "",
    filas: 0,
    filasConFiltro: 0,
    nuevo: true
  };
  filtro_actual: Filtro = {
    nombre_filtro: "",
    filas: 0,
    configuracion: [],
    datos: [],
    visto: false
  };

  columns_doc: any[] = [];
  rows_doc: any[] = [];

  datosFiltrados: any[] = [];
  dataDocument: any[] = [];

  numero: number = 0;
  total: string = "";
  cantidad: string = "";

  nombre_doc: string = "";
  nombre_filtro: string = "";

  constructor(private dataTransfer: DataTransfer, private collectionService: CollectionService, private filterService: FilterService, private messageService: MessageService, private router: Router) {
    this.iniciar();
  }

  iniciar() {
    if (this.data_actual.tipo == "") {
      this.router.navigateByUrl(this.url);
    } else {
      this.verificar_Documento();
    }
  }

  verificar_Documento() {
    this.inicializar();
    if (this.doc_actual.nuevo == true) {
      this.filtro_actual.filas = this.data_actual.doc.filas;
      this.extraerRows(this.dataDocument);
    } else {
      this.verificar_Filtros();
    }
    this.iniciarNumeros();
  }

  inicializar() {
    this.doc_actual = this.data_actual.doc;
    this.tipo_reporte = this.data_actual.tipo;
    //this.filtro_actual = this.data_actual.filtro;
    this.filtro_actual = {
      nombre_filtro: this.data_actual.filtro.nombre_filtro,
      filas: this.data_actual.filtro.filas,
      configuracion: this.data_actual.filtro.configuracion,
      datos: this.data_actual.filtro.datos,
      visto: this.data_actual.filtro.visto
    }
    this.dataDocument = this.collectionService.getDataDocument(this.tipo_reporte, this.doc_actual.nombre);
    this.extraerColumns(this.dataDocument);
  }

  iniciarNumeros() {
    this.numero = (this.filtro_actual.filas * 100) / this.doc_actual.filas;
    this.cantidad = this.filtro_actual.filas.toString();
    this.total = this.doc_actual.filas.toString();
    this.nombre_doc = this.doc_actual.nombre;
    this.nombre_filtro = this.filtro_actual.nombre_filtro;
  }

  verificar_Filtros() {
    if (!this.filtro_actual.visto) {
      this.aplicar_Filtro();
    } else {
      this.cargar_Filtro();
    }
  }

  cargar_Filtro() {
    this.extraerRows(this.filtro_actual.datos);
    console.log("Se cargo los filtros");
  }

  aplicar_Filtro() {
    let datos = this.filtro_actual.datos;
    if (datos.length == 0) {
      datos = this.dataDocument;
    }
    const data_Filtrada = this.filtrar(datos);
    this.extraerRows(data_Filtrada);
    // Guardar datos del filtro
    if (!this.doc_actual.nuevo) {
      //this.collectionService.setDataFilter(this.data_actual.tipo, this.doc_actual.nombre, this.filtro_actual.nombre_filtro, dataFilter);
      //this.collectionService.setVistaFilter(this.data_actual.tipo, this.doc_actual.nombre, this.filtro_actual.nombre_filtro);
    }
    this.filtro_actual.filas = data_Filtrada.length;
    //console.log("Se aplico los filtros");
  }

  filtrar(datos: any) {
    let configuracion = this.filtro_actual.configuracion;
    let n_campos = configuracion.length;
    let dataFilter: any[] = [];

    datos.forEach((fila: any) => {
      let cont = 0;
      for (const config in configuracion) {
        const columna: string = configuracion[config].nombre_columna;
        const config_name: string = configuracion[config].config_name;
        const config_value: [] = configuracion[config].config_value;

        let cumple_filtro = this.filterService.verificarFiltro(fila[`${columna}`], config_name, config_value);
        if (cumple_filtro) {
          cont += 1;
        }
      }
      if (cont == n_campos) {
        dataFilter.push(fila);
      }
    });
    return dataFilter;
  }

  extraerRows(dataFilter: any[]) {
    if (dataFilter.length > 0) {
      this.datosFiltrados = dataFilter;
      this.rows_doc = this.datosFiltrados.map((item: any) => Object.values(item));
    } else {
      let nuevo: any = {};
      nuevo = Object.assign(nuevo, this.dataDocument[0]);
      Object.keys(nuevo).forEach(clave => { nuevo[clave] = "" });
      this.datosFiltrados = [nuevo];
      this.rows_doc = [];
    }
  }

  extraerColumns(datos: any[]) {
    this.columns_doc = Object.keys(datos[0]);
  }

  //--------DESCARGAR--------

  descargar() {
    this.exportAsExcelFile(this.datosFiltrados, this.doc_actual.nombre);
    this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Archivo descargado', life: 5000 });
  }

  exportAsExcelFile(json: any[], excelFileName: string) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, `${excelFileName}.xlsx`);
    //XLSX.writeFile(workbook, `${excelFileName}_export_${new Date().getTime()}.xlsx`);
  }

  //-------Get Nuevos Nombres---------

  ingresoTittle_doc(evento: any) {
    //this.doc_actual.nombre = evento.target.value;
    this.nombre_doc = evento.target.value;
  }

  ingresoTittle_filtro(evento: any) {
    //this.filtro_actual.nombre_filtro = evento.target.value;
    this.nombre_filtro = evento.target.value;
  }

  //----------------
  tieneConfig(colum_name: string) {
    return this.filtro_actual.configuracion.find(item => item.nombre_columna === colum_name);
  }

  getRowsUnique(colum_name: string) {
    const index_colum = this.columns_doc.indexOf(colum_name);
    let filas = [];
    for (let i = 0; i < this.doc_actual.filas; i++) {
      filas.push(Object.values(this.dataDocument[i])[index_colum]);
    }
    return [...new Set(filas)];
  }

  recogerFiltros(config: any) {
    this.deleteConfig(config.colum_name);
    this.filtro_actual.configuracion.push(config);
    this.aplicar_Filtro();
    this.iniciarNumeros();
  }

  deleteConfig(colum_name: string) {
    this.filtro_actual.configuracion = this.filtro_actual.configuracion.filter(item => item.nombre_columna !== colum_name);
  }

  deleteFiltro(colum_name: string) {
    let existe = this.filtro_actual.configuracion.find(item => item.nombre_columna === colum_name);
    if (existe) {
      this.deleteConfig(colum_name);
      this.aplicar_Filtro();
      this.iniciarNumeros();
      return;
    }
    console.log("Nada que eliminar - filtro");
  }

  //--------GUARDAR--------

  guardarFiltro() {
    if (this.nombre_doc === "") {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El documento no tiene nombre', life: 5000 });
      return;
    }
    if (this.nombre_filtro === "") {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El filtro no tiene nombre', life: 5000 });
      return;
    }
    if (this.filtro_actual.configuracion.length <= 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No hay ningun filtro aplicado', life: 5000 });
      return;
    }
    this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Cambios guardados', life: 5000 });
  }

}
