import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DbInMemoryDataService } from './shared/services/db-in-memory-data.service';

import { CustomMaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
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
import { MapDataService } from './shared/services/mapdata.service';
import { ZoteroComponent } from './pages/zotero/zotero.component';
import { MatTreeModule } from '@angular/material/tree';
import { ZoteroDialogContComponent } from './pages/zotero/zotero-dialog-cont/zotero-dialog-cont.component';
import { MaterialTreeComponent } from './pages/zotero/material-tree/material-tree.component';
import { FileListComponent } from './pages/zotero/file-list/file-list.component';
import { NotesComponent } from './pages/notes/notes.component';
import { StripHtmlPipe } from './shared/pipes/strip-html.pipe';
import { AlbumsComponent } from './pages/albums/albums.component';
import { AlbumComponent } from './pages/album/album.component';
import { CategoryTreeComponent } from './components/category-tree/category-tree.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { VideoComponent } from './components/video/video.component';
import { SubtitleComponent } from './components/video/subtitle/subtitle.component';
import { SubtitlesComponent } from './components/video/subtitles/subtitles.component';
// import { SubtitleFormComponent } from './components/video/subtitle-form/subtitle-form.component';
import { TesterComponent } from './pages/tester/tester.component';
import { SortDatePipe } from './shared/pipes/sort.pipe';
import { TimelineDialogComponent } from './components/timeline/timeline-dialog/timeline-dialog.component';
import { MediaTimecodePipe } from './shared/pipes/media-timecode.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LookbooksComponent,
    LookbookComponent,
    LoadingComponent,
    EditComponent,
    MapComponent,
    MapHTMLMarkerComponent,
    ZoteroComponent,
    MaterialTreeComponent,
    ZoteroDialogContComponent,
    FileListComponent,
    NotesComponent,
    StripHtmlPipe,
    AlbumsComponent,
    AlbumComponent,
    CategoryTreeComponent,
    CategoriesComponent,
    TimelineComponent,
    VideoComponent,
    SubtitleComponent,
    SubtitlesComponent,
    // SubtitleFormComponent,
    TesterComponent,
    SortDatePipe,
    TimelineDialogComponent,
    MediaTimecodePipe,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    MatTreeModule,
    LeafletModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      DbInMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [MapDataService, StripHtmlPipe, SortDatePipe, MediaTimecodePipe ], // MediaTimecodePipe
  entryComponents: [MapHTMLMarkerComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
