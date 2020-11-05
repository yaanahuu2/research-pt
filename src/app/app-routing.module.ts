import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { LookbooksComponent } from './pages/lookbooks/lookbooks.component';
import { LookbookComponent } from './pages/lookbook/lookbook.component';
import { MapComponent } from './pages/map/map.component';


const routes: Routes = [
  {"path":"", "component": LoginComponent},
  {"path":"lookbooks","component": LookbooksComponent},
  {"path":"lookbook/:id", "component": LookbookComponent},
  {"path":"map", "component": MapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
