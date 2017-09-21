import { Component, OnInit, Input, Output, EventEmitter, ElementRef, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'rte',
  templateUrl: './rte.component.html',
  styleUrls: ['./rte.component.css']
})
export class RteComponent implements OnInit, AfterViewChecked {

  @Output()
  public Height = new EventEmitter();
  @Output()
  public Saved = new EventEmitter();
  @Input()
  public set Text(text) {
    this.text = text;

  }
  public text: string;
  private isDirty: boolean = false;
  private cleanValue: string;
  private editor: any;
  private height: number;

  constructor(private elm: ElementRef) { }
  public Input(event: any) {
    this.preventDefault(event);
    if (!this.editor)
      this.editor = event.srcElement;
    this.height = this.editor.scrollHeight + this.editor.offsetTop;
    this.Height.emit(this.height);

    this.isDirty = true;
  }
  public Italic(event: MouseEvent) {
    this.preventDefault(event);
    document.execCommand("italic", false, null);
  }
  public Bold(event: MouseEvent) {
    //this.preventDefault(event);
    document.execCommand("bold", false, null);
  }
  public Underline(event: MouseEvent) {
    this.preventDefault(event);
    document.execCommand("underline", false, null);
  }
  public UnOrderedList(event: MouseEvent) {
    this.preventDefault(event);
    document.execCommand("insertunorderedlist", false, null);
  }
  public OrderedList(event: MouseEvent) {
    this.preventDefault(event);
    document.execCommand("insertorderedlist", false, null);
  }
  public Focused(event: any) {
    //this.currentHeight = null;
  }
  public Reset(event: MouseEvent) {
    this.editor.innerHTML = this.cleanValue;
    this.isDirty = false;
  }
  public Save(event: MouseEvent) {
    this.text = this.editor.innerHTML;
    this.Saved.emit(this.text);
    this.cleanValue = this.text;
    this.isDirty = false;
  }
  ngAfterViewChecked() {
    if (!this.editor)
      this.editor = this.elm.nativeElement.querySelector("span");
    var newheight: number = this.editor.scrollHeight + this.editor.offsetTop;
    if(newheight != this.height){
      this.height = newheight;
      setTimeout(() => this.Height.emit(newheight), 0);
    }
  }
  ngOnInit() {
    this.cleanValue = this.text;
  }

  private preventDefault(event: any) {
    if (event.preventDefault) {
      event.preventDefault();
    }
    if (event.stopPropagation) {
      event.stopPropagation();
    }
  }
}
