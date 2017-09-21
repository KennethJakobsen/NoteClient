import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationService {

  public get BaseUrlHttp(){
    return "http://mealplan.westeurope.cloudapp.azure.com";
  }
   public get BaseUrlSignalR(){
    return "http://mealplan.westeurope.cloudapp.azure.com:2345";
  }
  constructor() { }

}
