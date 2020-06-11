import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Usuario} from '../usuario.component';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public isUserLoggedIn: boolean;
  private token;
  private admin;
  private user;
  private BASE_URL = 'http://localhost:8090';
  private RENEW_URL = `${this.BASE_URL}\\usuario\\renovar-ticket?token=`;
  private AUTH_URL = `${this.BASE_URL}\\usuario\\autenticar`;

  constructor(private http: HttpClient, private router: Router) {
    this.isUserLoggedIn = false;
  }

  renewToken(): any {
    return this.http.get(this.RENEW_URL + this.token);
  }

  auth(auth: Usuario): any {
    return this.http.post(this.AUTH_URL + `?login=${auth.login}&senha=${auth.senha}`, auth);
  }

  setResponse(response: any): void {
    this.isUserLoggedIn = response.autenticado;
    this.token = response.token;
    this.admin = response.administrador;
    this.user = response.login;
    this.router.navigate(['/home']);
  }

  getToken(): string {
    if (this.token === undefined) {
      this.router.navigate(['/']);
    } else {
      return this.token;
    }
  }

  getAdmin(): boolean {
    return this.admin;
  }

  getUser(): string {
    return this.user;
  }
}
