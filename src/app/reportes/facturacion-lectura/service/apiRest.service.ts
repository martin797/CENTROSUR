import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment'; //.prod
import { getErroresNode } from '../../shared/validators/validaciones';

@Injectable({
    providedIn: 'root'
})
export class ApiRestService {
    baseUrl: string = environment.baseUrl;
    constructor(private http: HttpClient) { }

    getFiltroByDocumento(nombre: string) {
        return this.http.get<any>(`${this.baseUrl}/reportesgestion/${nombre.toString()}`).pipe(
            map(
                data => {
                    return {
                        ok: true,
                        data: data.data
                    }
                },
            ),
            catchError(err => {
                return of({
                    ok: false,
                    data: getErroresNode(err)
                })
            })
        );
    }

}
