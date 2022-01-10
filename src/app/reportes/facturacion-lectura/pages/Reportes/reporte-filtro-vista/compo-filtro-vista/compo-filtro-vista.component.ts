import { Component, Input } from '@angular/core';
import { CollectionService } from '../../../../service/collection.service';
import { DataTransfer } from '../../../../service/transfer.service';
import { Documento } from '../../../../../interfaces/documentos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compo-filtro-vista',
  templateUrl: './compo-filtro-vista.component.html',
  styleUrls: ['./compo-filtro-vista.component.css']
})
export class CompoFiltroVistaComponent {

  @Input() tipo_reporte: string = "";
  @Input() doc_actual: Documento = {
    nombre: "",
    filas: 0,
    filasConFiltro: 0,
    nuevo: true
  }
  @Input("array") filtrosDocActual: any[] = [];

  url: string = '/document_informe';

  constructor(private collectionService: CollectionService, private dataTransfer: DataTransfer, private router: Router) {

  }

  getRowSelect(doc: Documento, filtro: {}) {
    let data = {
      tipo: this.tipo_reporte,
      doc: doc,
      filtro: filtro
    };
    this.dataTransfer.setFilter(data);
    this.router.navigateByUrl(this.url);//as per router
  }

  deleteRowSelect(nombreFiltro: string) {
    this.collectionService.eliminarFiltro(this.tipo_reporte, this.doc_actual, nombreFiltro);
    //this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Documento retirado', life: 3000 });
  }
}
