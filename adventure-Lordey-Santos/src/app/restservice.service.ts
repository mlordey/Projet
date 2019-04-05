import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { World, Pallier, Product } from './world';



@Injectable({
  providedIn: 'root'
})
export class RestserviceService {

  constructor(private http: HttpClient) { }

  server = "http://localhost:8080/"
  user = "";


getUser() {
    return this.user;
 }

setUser(user) {
    this.user = user;
 }

 private handleError(error: any): Promise<any> {
  console.error('An error occurred', error);
  return Promise.reject(error.message|| error)
  }


  getWorld(): Promise<World> {  
    let httpH = new HttpHeaders({'X-User': this.user});

    return this.http.get(this.server + "adventureisis/generic/world", {headers: {"X-User": this.user}}).toPromise().catch(this.handleError); 
  };

  getServer():string{
    return this.server;
  }
















}
