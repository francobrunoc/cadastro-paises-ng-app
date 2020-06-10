import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PaisViewModel} from '../pais.component';
import {UsuarioService} from '../../usuario/service/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private BASE_URL = 'http://localhost:8090';
  private LIST_ALL_URL = `${this.BASE_URL}\\pais\\listar?token=`;
  private DELETE_URL = `${this.BASE_URL}\\pais\\excluir?id=`;
  private SAVE_URL = `${this.BASE_URL}\\pais\\salvar?token=`;
  private RENEW_URL = `${this.BASE_URL}\\usuario\\renovar-ticket?token=`;

  constructor(private http: HttpClient, private usuarioService: UsuarioService) {}

  listAll(): Observable<PaisViewModel[]> {
    return this.http.get<PaisViewModel[]>(this.LIST_ALL_URL + this.usuarioService.getToken());
  }

  delete(id: number): Observable<any> {
    return this.http.get(this.DELETE_URL + id + `&token=${this.usuarioService.getToken()}`);
  }

  save(pais: PaisViewModel): Observable<any> {
    return this.http.post(this.SAVE_URL + this.usuarioService.getToken(), pais);
  }

  renewToken(): any {
    return this.http.get(this.RENEW_URL + this.usuarioService.getToken());
  }

}
