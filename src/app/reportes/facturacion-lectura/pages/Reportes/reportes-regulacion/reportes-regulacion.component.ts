import { Component } from '@angular/core';
import { CollectionService } from '../../../service/collection.service';
import { LocalstorageService } from '../../../service/localstorage.service';

@Component({
  selector: 'app-reportes-regulacion',
  templateUrl: './reportes-regulacion.component.html',
  styleUrls: ['./reportes-regulacion.component.css']
})
export class ReportesRegulacionComponent {

  constructor( private collectionService: CollectionService, private localstore: LocalstorageService) {
    //this.iniciar();
    //this.localstore.remove("documento");
  }

  tipo_reporte: string = "Regulación";
  url1: string = "/reportes_regulacion";

  iniciar() {
    if (this.localstore.get("Doc_regulacion")) {
      this.collectionService.setData(this.tipo_reporte, this.localstore.get("Doc_regulacion"));
    }
  }

  get documentos() {
    return this.collectionService.documentosRegulacion;
  }

}
