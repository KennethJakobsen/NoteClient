import { Component, OnInit } from '@angular/core';
import { NoteService } from "../note.service"
import { Note } from "../model/vm"

@Component({
  selector: 'note-collection',
  templateUrl: './note-collection.component.html',
  styleUrls: ['./note-collection.component.css']
})
export class NoteCollectionComponent implements OnInit {

public Notes: Note[] = new Array<Note>();
  constructor(private svc: NoteService) { 
    svc.Notes.subscribe(value => {
      this.Notes = value;
    })
  }

  ngOnInit() {
  }

}
