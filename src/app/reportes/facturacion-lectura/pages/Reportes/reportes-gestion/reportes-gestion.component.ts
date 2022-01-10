import { Component } from '@angular/core';
import { CollectionService } from '../../../service/collection.service';
import { LocalstorageService } from '../../../service/localstorage.service';

@Component({
  selector: 'app-reportes-gestion',
  templateUrl: './reportes-gestion.component.html',
  styleUrls: ['./reportes-gestion.component.css']
})
export class ReportesGestionComponent {

  constructor( private collectionService: CollectionService, private localstore: LocalstorageService) {
    //this.iniciar();
    //this.localstore.remove("documento");
  }

  tipo_reporte: string = "Gestión";
  url1: string = "/reportes_gestion";

  iniciar() {
    if (this.localstore.get("Doc_gestion")) {
      this.collectionService.setData(this.tipo_reporte, this.localstore.get("Doc_gestion"));
    }
  }

  get documentos() {
    return this.collectionService.documentosGestion;
  }

}
