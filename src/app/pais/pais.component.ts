import {Component, OnInit, ViewChild} from '@angular/core';
import {PaisService} from './service/pais.service';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import {UsuarioService} from '../usuario/service/usuario.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})
export class PaisComponent implements OnInit {

  bool = true;
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject();

  dtOptions: DataTables.Settings = {
    data: [],
    columns: [
      {title: '#', data: 'id'},
      {title: 'Nome', data: 'nome'},
      {title: 'Sigla', data: 'sigla'},
      {title: 'Gentilico', data: 'gentilico'},
      {
        data: '', orderable: false, render() { return `
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary" id="edit">Alterar</input>
                        <button type="button" class="btn btn-sm btn-outline-secondary" id="delete">Excluir</input>
                    </div>`;
        }
      }
    ],
    rowCallback: (row: Node, data: PaisViewModel) => {
      const self = this;
      $('td', row).off('click');
      $('#edit', row).on('click', () => {
        self.edit(data);
      });
      $('#delete', row).on('click', () => {
        self.delete(data);
      });
      return row;
    }
  };

  constructor(private paisService: PaisService, public usuarioService: UsuarioService) {}

  model: PaisViewModel = {
    id: null,
    nome: '',
    sigla: '',
    gentilico: ''
  };

  ngOnInit() {
    this.listAll();
  }

   rerender(): void {
    if ('dtInstance' in this.dtElement){
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    }
    else {
      this.dtTrigger.next();
    }
  }

  listAll() {
    if (this.token()) {
      this.paisService.listAll().subscribe(
        res => {
          this.dtOptions.data = res;
          setTimeout(() => {
            this.rerender();
          });
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  delete(pais: PaisViewModel): void {
    if (this.usuarioService.getAdmin()) {
      if (confirm('Você tem certeza que deseja excluir este país?') && this.token()) {
        this.paisService.delete(pais.id).subscribe(
          res => {
            if (res) {
              this.listAll();
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    } else { alert('Usuário não autorizado'); }
  }

  reset() {
    this.model.id = null;
    this.model.nome = null;
    this.model.sigla = null;
    this.model.gentilico = null;
  }

  save() {
    if (this.token()) {
      this.paisService.save(this.model).subscribe(
        res => {
          if (res.id != null) {
            this.listAll();
          }
        },
        error => {
          console.log(error);
        }
      );
      this.reset();
    }
  }

  edit(pais: PaisViewModel) {
    if (this.usuarioService.getAdmin()) {
      this.model.id = pais.id;
      this.model.nome = pais.nome;
      this.model.sigla = pais.sigla;
      this.model.gentilico = pais.gentilico;
    } else { alert('Usuário não autorizado'); }
  }

  token() {
    return this.paisService.renewToken().subscribe(res => res);
  }
}

export interface PaisViewModel {
  id?: number;
  nome: string;
  sigla: string;
  gentilico: string;
}
