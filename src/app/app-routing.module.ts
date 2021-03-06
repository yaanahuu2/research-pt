import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { LookbooksComponent } from './pages/lookbooks/lookbooks.component';
import { LookbookComponent } from './pages/lookbook/lookbook.component';
import { MapComponent } from './pages/map/map.component';
import { ZoteroComponent } from './pages/zotero/zotero.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { AlbumComponent } from './pages/album/album.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { TesterComponent } from './pages/tester/tester.component';

const routes: Routes = [
  {"path":"", "component": LoginComponent},
  {"path":"lookbooks","component": LookbooksComponent},
  {"path":"lookbook/:id", "component": LookbookComponent},
  {"path":"test", "component": TesterComponent},
  {"path":"map", "component": MapComponent},
  {"path":"albums", "component": AlbumsComponent},
  {"path":"album/:id", "component": AlbumComponent},
  {"path":"zotero", "component": ZoteroComponent},
  {"path":"categories", "component": CategoriesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
