import {Component} from '@angular/core';
import {UsuarioService} from './usuario/service/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public usuarioService: UsuarioService) {}
  title = 'cadastro-paises-app';
}
