import { Component } from '@angular/core';
import { Documento } from '../../../../../interfaces/documentos';
import { Filtro } from '../../../../../interfaces/filtros';
import { FilterService } from '../../../../service/filter.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reporte-vista-regula',
  templateUrl: './reporte_vista_regula.component.html',
  styleUrls: ['./reporte_vista_regula.component.css']
})
export class ReporteVistaRegulaComponent {

  constructor(private filterService: FilterService) {
    this.extraerColumnsAndRows(this.dataDocument); //saca las filas y columnas del dataDocument
  }
  //--------------Variables--------
  validarCadena:any
  selecion: any;
  selecion2: any;
  opcion: any;
  opcion2: any;
  letras: string[] = ['--', 'Es igual a', 'No es igual a', 'Comienza por', 'Termina con', 'Contiene', 'No contiene']
  numeros: string[] = ['--', 'Es igual a', 'No es igual a', 'Mayor que', 'Menor que', 'Mayor o igual que', 'Menor o igual que', 'Entre', 'Diez mejores', 'Superior del promedio', 'Inferior del promedio']
  columns_doc: any[] = [];
  rows_doc: any[] = [];
  selectedALL: any;
  dataDocument:any = [
    { Nombre: "David", Ciudad: 'Cuenca', Edad: 18, selected:false },
    { Nombre: "Marcelo", Ciudad: 'Manta', Edad: 55, selected:false },
    { Nombre: "Ana", Ciudad: 'Quito', Edad: 22, selected:false },
    { Nombre: "Luis", Ciudad: 'Cuenca', Edad: 33, selected:false },
  ];

  nombreFiltro = "Dummy";
  doc_actual: Documento = {
    nombre: "Bill_01",
    filas: 4, //numero de filas del dataDocument
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
  //------------------------------------------

  extraerColumnsAndRows(datos: any) {
    if (datos.length !== 0) {
      this.columns_doc = Object.keys(datos[0]);
      this.rows_doc = datos.map((doc: any) => Object.values(doc));
    }
  }
  verificar(colum_name: any) {
    const index_colum = this.columns_doc.indexOf(colum_name);
    let valor = Object.values(this.dataDocument[0])[index_colum];
    if (typeof valor === "string") {
      return "L";
    } else if (typeof valor === "number") {
      return "N"
    } else {
      return "F"
    }
  }

  //LLENADO DEL VALORES......................
  update(e: any) {
    this.opcion = e.target.value;
    console.log("Filtro 1:", this.opcion);
  }

  seleccionarCategoria(select: any) {
    this.selecion = select;
    console.log("Valor 1:", this.selecion);
  }

  update2(e: any) {
    this.opcion2 = e.target.value;
    console.log("Filtro 2:", this.opcion2);
  }

  seleccionarCategoria2(select: any) {
    this.selecion2 = select;
    console.log("Valor 2:", this.selecion2);
  }

  getRowsUnique(colum_name: string) {
    const index_colum = this.columns_doc.indexOf(colum_name);
    let filas = [];
    for (let i = 0; i < this.doc_actual.filas; i++) {
      filas.push(Object.values(this.dataDocument[i])[index_colum]);
    }
    return [...new Set(filas)];
  }

  recogerFiltros(colum_name: string, filtro_name: string, valor_campo: any) {
    if (colum_name === undefined || filtro_name === undefined || filtro_name === "--" || valor_campo === undefined) {
      console.log("Validation");
      return
    }
    const config = {
      nombre_columna: colum_name,
      config_name: filtro_name,
      config_value: [valor_campo],
    }
    this.filtro_actual.configuracion.push(config);
    this.aplicar_Filtro();

  }

  aplicar_Filtro() {
    let datos = this.dataDocument;

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
    this.extraerColumnsAndRows(dataFilter);
    console.log("Se aplico los filtros");
  }

  //Sleccionar todo.....
  selectALL(){
    for(var i=0; i < this.dataDocument.length; i++){
      this.dataDocument[i].selected = this.selectedALL;
    }
  }
  aux:any = 0;
  checkIfAllSelected(){
    this.selectedALL = this.dataDocument.every(function (item:any) {
      if(item.selected == true){
        return true;
      }else{
        return false;
      }
      
    })
  }

  filtro(item:any){
    if(item.includes(this.validarCadena)){
      return true;
    }else{
      return false;
    }
  }


}
