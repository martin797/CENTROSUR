import { Component } from '@angular/core';
import { DataTransfer } from '../../../service/transfer.service';
import { CollectionService } from '../../../service/collection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reporte-filtro-vista',
  templateUrl: './reporte-filtro-vista.component.html',
  styleUrls: ['./reporte-filtro-vista.component.css']
})
export class ReporteFiltroVistaComponent {

  doc_actual = this.dataTransfer.getDocument();
  tipo_reporte: string = this.dataTransfer.getDocumentTipo();
  url_padre: string = this.dataTransfer.getDocumentURl_padre();
  url: string = '/document_informe';

  filtros_doc: any[] = [];
  filasFiltro: number = 0;

  constructor(private dataTransfer: DataTransfer, private collectionService: CollectionService, private router: Router) {
    this.iniciar();
  }

  iniciar() {
    if (this.doc_actual.nombre == "") {
      this.router.navigateByUrl(this.url_padre);
    }
    this.filasFiltro = this.doc_actual.filasConFiltro;
    this.filtros_doc = this.collectionService.getFiltrosDocument(this.tipo_reporte, this.doc_actual.nombre);
  }

  crearFiltro() {
    let data = {
      tipo: this.tipo_reporte,
      doc: {
        nombre: this.doc_actual.nombre,
        filas: this.doc_actual.filas,
        nuevo: true
      },
      filtro: {
        nombre_filtro: "",
        filas: 0,
        configuracion: [],
        datos: [],
        visto: false
      },
    };
    this.dataTransfer.setFilter(data);
    this.router.navigateByUrl(this.url);//as per router
  }

}