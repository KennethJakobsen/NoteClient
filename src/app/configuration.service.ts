import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationService {

  public get BaseUrlHttp(){
    return "https://cluster.kenned.dk";
  }
   public get BaseUrlSignalR(){
    return "http://cluster.kenned.dk:2345";
  }
  constructor() { }

}
