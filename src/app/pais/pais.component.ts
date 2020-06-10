import {Component, OnInit} from '@angular/core';
import {PaisService} from './service/pais.service';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})
export class PaisComponent implements OnInit {

  constructor(private paisService: PaisService) {}

  get collectionSize() {
    return this.PAISES.length;
  }

  page = 1;
  pageSize = 4;
  PAISES: PaisViewModel[] = [];
  model: PaisViewModel = {
    id: null,
    nome: '',
    sigla: '',
    gentilico: ''
  };

  get paises(): PaisViewModel[] {
    return this.PAISES
      .map((pais, i) => ({id: i + 1, ...pais}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  ngOnInit(): void {
    this.listAll();
  }

  listAll(): void {
    if (this.token()) {
      this.paisService.listAll().subscribe(
        res => {
          this.PAISES = res;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  delete(pais: PaisViewModel): void {
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
    this.model.id = pais.id;
    this.model.nome = pais.nome;
    this.model.sigla = pais.sigla;
    this.model.gentilico = pais.gentilico;
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
