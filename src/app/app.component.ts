import { Component } from '@angular/core';
import { NoteService} from "./note.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private noteSvc: NoteService){

  }
  title = 'SignalR Notes';
  public AddNote(){
    this.noteSvc.AddNewNote();
  }
}
