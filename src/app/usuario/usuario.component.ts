import {Component, OnInit} from '@angular/core';
import {UsuarioService} from './service/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }

  auth: Usuario = {
    login: '',
    senha: ''
  };

  ngOnInit(): void {
  }

  login(): void {
    this.usuarioService.auth(this.auth).subscribe(res =>
      this.usuarioService.setResponse(res)
    );
  }
}

export interface Usuario {
  login: string;
  senha: string;
}

