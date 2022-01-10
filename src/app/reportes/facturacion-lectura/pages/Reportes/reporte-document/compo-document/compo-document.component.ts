import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DataTransfer } from '../../../../service/transfer.service';
import { CollectionService } from '../../../../service/collection.service';
import { Documento } from '../../../../../interfaces/documentos';

@Component({
  selector: 'app-compo-document',
  templateUrl: './compo-document.component.html',
  styleUrls: ['./compo-document.component.css']
})
export class CompoDocumentComponent {

  @Input() tipo_reporte: string = "";
  @Input("array") documentos: any[] = [];
  @Input("url_padre") url_p3: string = "";
  url: string = '/filtros';

  constructor(private collectionService: CollectionService, private dataTransfer: DataTransfer, private messageService: MessageService, private router: Router) {

  }

  getCode(nombreDoc: string) {
    let variable = nombreDoc.replace(/\s/g, "");
    return variable;
  }

  getRowSelect(doc: Documento) {
    this.dataTransfer.setDocument(doc, this.tipo_reporte, this.url_p3);
    this.router.navigateByUrl(this.url);//as per router
  }

  deleteRowSelect(doc: Documento) {
    this.collectionService.eliminarDocumento(this.tipo_reporte, doc);
    this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Documento retirado', life: 3000 });
  }

}
