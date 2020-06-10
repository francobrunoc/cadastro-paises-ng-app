import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {PaisComponent} from './pais/pais.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {UsuarioComponent} from './usuario/usuario.component';
import {SiglaComponent} from './pais/sigla.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import {UsuarioService} from './usuario/service/usuario.service';

const appRoutes: Routes = [
  {
    path: '',
    component: UsuarioComponent,
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'pais',
    component: PaisComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PaisComponent,
    UsuarioComponent,
    SiglaComponent,
    NavigationComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
    NgbModule,
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }


