import { Component, OnInit, Input, ChangeDetectionStrategy, trigger, state, style, animate, transition, HostBinding } from '@angular/core';
import { NoteService } from "../note.service"
import { Note } from "../model/vm"
import { Observable } from "rxjs/rx"

@Component({
  selector: 'note',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],

})
export class NoteComponent implements OnInit {

  @Input()
  public Note: Note;


  offsetX: number;
  offsetY: number;
  currentHeight: number = 0;
  isEditingTitle: boolean = false;
  isDragging: boolean = false;
  isDetailsOpen: boolean = false;

  constructor(private nSvc: NoteService) {

  }


  @HostBinding("style.top.px")
  public get Top() {
    return this.Note.Top;
  }
  @HostBinding("style.left.px")
  public get Left() {
    return this.Note.Left;
  }
  public Move(event: DragEvent) {
    this.Note.Left = event.clientX - this.offsetX;
    this.Note.Top = event.clientY - this.offsetY;
    event.dataTransfer.setData("text", event.srcElement.parentElement.innerHTML);
    this.nSvc.UpdateNote(this.Note);
    this.isDragging = !this.isDragging;
  }
  public UpdatePosition(event: MouseEvent) {
    this.offsetX = event.offsetX;
    this.offsetY = event.offsetY;
  }
  public ToggleDetails(event: any) {

    this.isDetailsOpen = event.target.checked;
    if (event.target.checked) {
      this.currentHeight = event.target.nextElementSibling.firstElementChild.scrollHeight;
    }
    else {
      this.currentHeight = event.target.nextElementSibling.firstElementChild.scrollHeight;
      this.currentHeight = 0;
    }

  }
  private ToggleEdit(event: MouseEvent) {
    event.preventDefault();
    if (this.isEditingTitle)
      this.nSvc.UpdateNote(this.Note);
    this.isEditingTitle = !this.isEditingTitle;


  }
  private contentUpdated(text: string) {
    this.Note.Description = text;
    this.nSvc.UpdateNote(this.Note);
  }
  private getHeight(height: number) {
    this.currentHeight = height;
  }

  public Remove(event: MouseEvent) {
    event.preventDefault();
    this.nSvc.Remove(this.Note);

  }
  private get editHeight() {
    if (this.isDetailsOpen)
      return this.currentHeight;
    else
      return 0;
  }

  ngOnInit() {

  }

}
