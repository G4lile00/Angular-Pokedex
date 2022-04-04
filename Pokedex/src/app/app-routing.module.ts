import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecifyComponent } from './specify/specify.component';
import { PokedexComponent } from './pokedex/pokedex.component';

const routes: Routes = [
  { path: '', component: PokedexComponent },
  { path: 'poke', component: SpecifyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
