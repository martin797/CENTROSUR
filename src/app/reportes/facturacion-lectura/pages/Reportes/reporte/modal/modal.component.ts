import { Component, OnInit, Input, AfterViewInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Documento } from '../../../../../interfaces/documentos';
import { Filtro } from '../../../../../interfaces/filtros';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, AfterViewInit {

  constructor(private elementRef: ElementRef, private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.verConfiguracionAll();
  }

  @Output() enviarConfiguracion = new EventEmitter();

  @Input() colum: string = "";
  @Input() rowsUnique: any[] = [];
  @Input() columns_doc: any[] = [];
  @Input() first_element: any = {};
  @Input() doc_actual: Documento = {
    nombre: "",
    filas: 0,
    filasConFiltro: 0,
    nuevo: true
  }
  @Input() filtro_actual: Filtro = {
    nombre_filtro: "",
    filas: 0,
    configuracion: [],
    datos: [],
    visto: false
  }
  @ViewChild('modalFiltro') exampleModals: any;

  letras: string[] = ['--', 'Es igual a', 'No es igual a', 'Comienza por', 'Termina con', 'Contiene', 'No contiene']
  numeros: string[] = ['--', 'Es igual a', 'No es igual a', 'Mayor que', 'Menor que', 'Mayor o igual que', 'Menor o igual que', 'Diez mejores', 'Superior del promedio', 'Inferior del promedio']
  selecion: any;
  selecion2: any;
  opcion: any;
  opcion2: any;

  verTipo(colum_name: any) {
    const index_colum = this.columns_doc.indexOf(colum_name);
    let valor = Object.values(this.first_element)[index_colum];
    if (typeof valor === "string") {
      return "L";
    } else if (typeof valor === "number") {
      return "N"
    } else {
      return "F"
    }
  }

  verConfiguracion(colum_name: string, config: string) {
    const result = this.filtro_actual.configuracion.find(item => item.nombre_columna === colum_name);
    if (result && result.config_name === config) {
      return true;
    }
    return false;
  }

  verConfiguracionAll() {
    const result = this.filtro_actual.configuracion.find(item => item.nombre_columna === this.colum);
    if (result) {
      if ((<HTMLInputElement>document.getElementById(`texto-${this.colum}`))) {
        (<HTMLInputElement>document.getElementById(`texto-${this.colum}`)).value = result.config_value[0];
      }
    }
  }

  update(e: any) {
    this.opcion = e.target.value;
  }

  seleccionarCategoria(colum_name: any, select: any) {
    //console.log("Seleccion 1:", select);
    //(<HTMLInputElement>document.getElementById(`texto-${colum_name}`)).value = select;
    this.selecion = select;
  }

  ingresoTexto(colum_name: string, e: any) {
    //console.log("Escribe 1:", e.target.value);
    //(<HTMLInputElement>document.getElementById(`texto-${colum_name}`)).value = e.target.value;
    this.selecion = e.target.value;
  }

  update2(e: any) {
    this.opcion2 = e.target.value;
  }

  seleccionarCategoria2(select: any) {
    this.selecion2 = select;
  }

  ingresoTexto2(e: any) {
    this.selecion2 = e.target.value;
  }

  recogerFiltros(colum_name: string, filtro_name: string, valor_campo: any) {
    if (colum_name === undefined || filtro_name === undefined || filtro_name === "--" || valor_campo === undefined) {
      console.log("Validation");
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debe llenar los campos', life: 5000 });
      return
    }
    const config = {
      nombre_columna: colum_name,
      config_name: filtro_name,
      config_value: [valor_campo],
    }
    //console.log("vamos a filtrar");
    this.exampleModals.modal("hide");
    this.enviarConfiguracion.emit(config);
  }

}
