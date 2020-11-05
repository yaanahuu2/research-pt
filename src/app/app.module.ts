import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CustomMaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { LookbooksComponent } from './pages/lookbooks/lookbooks.component';
import { LookbookComponent } from './pages/lookbook/lookbook.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingComponent } from './components/loading/loading.component';
import { EditComponent } from './page/edit/edit.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './pages/map/map.component';
import { MapHTMLMarkerComponent } from './pages/map/map-htmlmarker/map-htmlmarker.component';
import { MapDataService } from './services/mapdata.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LookbooksComponent,
    LookbookComponent,
    LoadingComponent,
    EditComponent,
    MapComponent,
    MapHTMLMarkerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    LeafletModule
  ],
  providers: [MapDataService],
  entryComponents: [MapHTMLMarkerComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
