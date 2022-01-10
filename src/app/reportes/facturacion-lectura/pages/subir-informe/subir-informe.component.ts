import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';
import { Documento } from '../../../interfaces/documentos';
import { Filtro } from '../../../interfaces/filtros';
import { CollectionService } from '../../service/collection.service';
import { ApiRestService } from '../../service/apiRest.service';
import { FilterService } from '../../service/filter.service';

@Component({
  selector: 'app-subir-informe',
  templateUrl: './subir-informe.component.html',
  styleUrls: ['./subir-informe.component.css']
})

export class SubirInformeComponent {

  constructor(private collectionService: CollectionService, private filterService: FilterService, private apiRestService: ApiRestService, private messageService: MessageService) {

  }

  @Input() tipo_reporte: string = "";
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  docExcelJson: any;
  nuevoDoc: Documento = {
    nombre: "",
    filas: 0,
    filasConFiltro: 0,
    nuevo: true
  }

  onFileChangeExcel(evento: any) {
    let workBook: any;
    let jsonData: any;
    const reader = new FileReader();
    const file = evento.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial: any, name: any) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      // Convert to JSON
      let dataString = JSON.parse(JSON.stringify(jsonData))
      let dataJson = null;
      for (const key in dataString) {
        if (Object.prototype.hasOwnProperty.call(dataString, key)) {
          dataJson = dataString[key];
          break;
        }
      }
      /* save data */
      this.nuevoDoc.nombre = evento.target.files[0].name.split(".")[0]; //Nombre del archivo
      this.docExcelJson = JSON.parse(JSON.stringify(dataJson)); //Datos del archivo

      if (this.nuevoDoc.nombre.trim().length === 0) {
        //console.log("No se pudo obtener el nombre del archivo");
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener el nombre del archivo', life: 5000 });
        return;
      }

      if (this.docExcelJson.length === 0) {
        //console.log("El documento esta vacio");
        //this.notifier.notify( "error", "El documento esta vacio" );
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El documento esta vacio', life: 5000 });
        return;
      }

      this.getFiltrosDocumento_Api();
    };
    reader.readAsBinaryString(file);
  }

  getFiltrosDocumento_Api() {
    this.apiRestService.getFiltroByDocumento(this.nuevoDoc.nombre).subscribe(
      //this.apiRestService.getFiltroByDocumento("Bill_01").subscribe(
      data => {
        //console.log(data); //Aqui vienen los errores
        if (data.ok == true) {
          this.recibirDocumento(data.data, true);
        } else {
          if (data.data.conexion) {
            this.messageService.add({
              severity: 'error', summary: 'Error', detail: data.data.mensaje, life: 5000
            });
          } else {
            this.messageService.add({
              severity: 'warn', summary: 'Advertencia', detail: data.data, life: 5000
            });
            this.recibirDocumento(data.data, false);
          }
        }
      }
    );
  }

  recibirDocumento(data: {}, existe: boolean) {
    let filtros: Filtro[] = [];
    let filas_doc = this.docExcelJson.length;
    let filas_doc_con_filtro = this.docExcelJson.length;
    if (existe) {
      const datos = JSON.parse(JSON.stringify(data));
      filas_doc_con_filtro = 0;
      for (const filtro in datos.filtros) {
        let filas_filtro = 0;
        const configuracion = datos.filtros[filtro].configuracion;
        const nombrefiltro = datos.filtros[filtro].nombre_filtro;
        const n_campos = configuracion.length;

        this.docExcelJson.forEach((fila: any) => {
          let aplicaFiltro = 0;
          for (const config in configuracion) {
            const columna: string = configuracion[config].nombre_columna;
            const config_name: string = configuracion[config].config_name;
            const config_value: [] = configuracion[config].config_value;

            let cumple_filtro = this.filterService.verificarFiltro(fila[`${columna}`], config_name, config_value);
            //console.log("Cumple: ", cumple_filtro);
            if (cumple_filtro) {
              aplicaFiltro += 1;
            }
          }
          if (aplicaFiltro == n_campos) {
            filas_doc_con_filtro += 1;
            filas_filtro += 1;
          }
        });

        filtros.push(
          {
            nombre_filtro: nombrefiltro,
            filas: filas_filtro,
            configuracion: configuracion,
            datos: [],
            visto: false
          }
        );
        //console.log("Filtro: ", filtros);
      }
    }
    this.agregarDocumento(filtros, filas_doc, filas_doc_con_filtro, existe);
  }

  agregarDocumento(filtros: Filtro[], filas_doc: number, filas_doc_con_filtro: number, existe: boolean) {

    this.nuevoDoc.filas = filas_doc;
    this.nuevoDoc.filasConFiltro = filas_doc_con_filtro;
    this.nuevoDoc.nuevo = !existe;

    let nuevoColleccion = {
      documento: this.nuevoDoc,
      filtros: filtros,
      datos: this.docExcelJson
    }

    this.collectionService.agregarCollection(this.tipo_reporte, nuevoColleccion);
    //this.localstore.set("Documentos", this.collectionService.allCollection);

    //Reiniciar variables
    this.nuevoDoc = {
      nombre: "",
      filas: 0,
      filasConFiltro: 0,
      nuevo: true
    }
    this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Documento importado', life: 5000 });
  }

}