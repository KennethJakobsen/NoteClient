import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'

import { AppComponent } from './app.component';
import { NoteCollectionComponent } from './note-collection/note-collection.component';
import { NoteComponent } from './note/note.component';
import { NoteService } from './note.service';
import { NoteRemoteService } from './note/note.remote.service'
import { RteComponent } from './rte/rte.component'
import { ConfigurationService } from "./configuration.service"

@NgModule({
  declarations: [
    AppComponent,
    NoteCollectionComponent,
    NoteComponent,
    RteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Angular2FontawesomeModule
  ],
  providers: [NoteService, NoteRemoteService, ConfigurationService],
  bootstrap: [
    AppComponent    ]
})
export class AppModule { }
