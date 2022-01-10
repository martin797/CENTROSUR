import { APP_BOOTSTRAP_LISTENER, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) {

  }

  titulo: string = 'CENTROSUR';

  //Url que se usaran en el navbar para la vinculación......
  url_subir: string = 'subir_informe';
  url_home: string = 'centroSur'; //cualquier cosa
  url_gestion: string = 'reportes_gestion';
  url_regulacion: string = 'reportes_regulacion';
  url_regulacion_a: string = 'repor-regulacion';

  ayuda() {
    alert('Ayuda')
  }

  contactenos() {
    alert('Contactenos')
  }

  mostrar_arcgivo() {
  }

  openHome() {
    this.router.navigateByUrl(this.url_home);//as per router
  }

  openGestion() {
    this.router.navigateByUrl(this.url_gestion);//as per router
  }

  openRegulacion() {
    this.router.navigateByUrl(this.url_regulacion);//as per router
  }
  openRegulacion_A() {
    this.router.navigateByUrl(this.url_regulacion_a);//as per router
  }
}
