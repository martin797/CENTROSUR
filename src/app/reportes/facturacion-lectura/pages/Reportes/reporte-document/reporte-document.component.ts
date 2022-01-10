import { Component, Input } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-reporte-document',
  templateUrl: './reporte-document.component.html',
  styleUrls: ['./reporte-document.component.css']
})
export class ReporteDocumentComponent {

  @Input() tipo_reporte: string = "";
  @Input() array: any[] = [];
  @Input("url_padre") url_p2: string = "";

  constructor() {

  }

  mostrarModal(): void {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

}