import { Injectable } from '@angular/core';
import { Note } from "./model/vm";
import { BehaviorSubject } from "rxjs/rx"
import { NoteRemoteService } from "./note/note.remote.service"

@Injectable()
export class NoteService {
  currentId: number = 0;
  private _notes: Note[];
  public Notes: BehaviorSubject<Note[]>;
  constructor(private rSvc: NoteRemoteService) {
    this._notes = new Array<Note>();
    this.Notes = new BehaviorSubject<Note[]>(this._notes);
    this.rSvc.Created.subscribe((note: Note) => {
      if (!this.NoteExists(note)) {
        var n = new Note();
        n.DeSerialize(note);
        this._notes.push(n);
        this.Notes.next(this._notes);
      }
    });

    this.rSvc.Updated.subscribe((note: Note) => {
      this._notes.forEach((n: Note, index: number) => {
        if (n.Id === note.Id) {
          n.DeSerialize(note);
        }

        this.Notes.next(this._notes);
      });
    });

    this.rSvc.Removed.subscribe((note: Note) => {
      this._notes.forEach((n: Note, index: number) => {
        if (n.Id === note.Id) {
          this._notes.splice(index, 1);
        }

        this.Notes.next(this._notes);
      });
    });
  }
  public AddNewNote() {
    this.rSvc.GetGuid().then((guid: string) => {
      var note = new Note();
      note.Id = guid;
      this._notes.push(note);
      this.rSvc.CreateNote(note);
      this.Notes.next(this._notes);
    });
  }
  public Remove(note: Note) {
    this._notes.forEach((n: Note, index: number) => {
      if (n.Id === note.Id) {
        this.rSvc.RemoveNote(note);
        this._notes.splice(index, 1);
      }

      this.Notes.next(this._notes);
    });

  }
  private NoteExists(note: Note) {
    var exist: boolean = false;
    this._notes.forEach((n: Note, index: number) => {
      if (n.Id === note.Id) {
        exist = true;
      }
    });
    return exist;
  }
  public UpdateNote(note: Note) {
    this.rSvc.UpdateNote(note);
  }
}
