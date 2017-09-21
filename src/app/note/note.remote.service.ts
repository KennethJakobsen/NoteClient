import { Injectable, EventEmitter } from '@angular/core';
import { HttpConnection, HubConnection } from '@aspnet/signalr-client/dist/src'
import { Http, Response, RequestOptions, Headers } from "@angular/http";
import { Observable } from "rxjs/rx"
import { Note } from "../model/vm"
import { ConfigurationService } from "../configuration.service"

@Injectable()
export class NoteRemoteService {


  private _headers: Headers;
  private _options: RequestOptions;
  public Connection: HubConnection;
  public Created: EventEmitter<Note> = new EventEmitter<Note>();
  public Updated: EventEmitter<Note> = new EventEmitter<Note>();
  public Removed: EventEmitter<Note> = new EventEmitter<Note>();

  constructor(private http: Http, private config: ConfigurationService) {
    var conn = new HttpConnection(this.config.BaseUrlSignalR + "/hubs/note");//"http://mealplan.westeurope.cloudapp.azure.com:2345/time");

    this.Connection = new HubConnection(conn);
    this.Connection.on("createNote", (args: Note) => {
      this.Created.emit(args);
    });
    this.Connection.on("updateNote", (args: Note) => {
      this.Updated.emit(args);
    });
    this.Connection.on("removeNote", (args: Note) => {
      this.Removed.emit(args);
    });
    this.Connection.start();


    this._headers = new Headers({ 'Content-Type': 'application/json' });
    this._options = new RequestOptions({ headers: this._headers });
  }

  public GetGuid(): Promise<string> {
    return this.http.get(this.config.BaseUrlHttp + "/api/notes/api/note/id", this._options)
      .toPromise()
      .then((r: any, ) => {
        return r._body;
      });


  }
  
  public CreateNote(note: Note){
    this.Connection.invoke("create", note);
  }

  public UpdateNote(note: Note){
    this.Connection.invoke("update", note);
  }

  public RemoveNote(note: Note){
    this.Connection.invoke("remove", note);
  }

}
