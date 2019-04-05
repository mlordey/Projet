import { Component, ValueProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestserviceService } from './restservice.service';
import { World, Product, Pallier } from './world';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToasterModule, ToastComponent, ToasterService, ToasterContainerComponent} from 'angular2-toaster';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adventure-Lordey-Santos';

  //constructor ( private http: HttpClient){}

  world: World = new World();
  server: string;
  qtmulti : String = "1";
  private toasterService: ToasterService;
  badgeManager=false;
  username:string;

  constructor(private service: RestserviceService, private toaster: ToasterService) {
    this.server = service.server;
    this.username = localStorage.getItem("username");
    console.log(this.username);
    if (this.username==null){
      this.username="Petale"+Math.floor(Math.random() * 10000);
      localStorage.setItem("username", this.username);
    }
   // this.username="anais";
    service.setUser(this.username);
    service.getWorld().then(
      world => {
        this.world = world;
      }
    );
    this.toasterService = toaster;
  }

  onUsernameChanged(username : string) {
    this.username = username;
    localStorage.setItem("username", this.username);
  }

  onProductionDone(p : Product) {
    this.world.money += (p.revenu*p.quantite);
    this.world.score =this.world.money+ (p.revenu*p.quantite);
    //Permet de générer le new des managers
    this.verifManagerHirable();   
    console.log(this.world.money);
  }

  changeBouton(){
    switch(this.qtmulti){
      case "1":
        this.qtmulti="10";
        break;
      case "10":
        this.qtmulti="100";
        break;
      case "100":
        this.qtmulti="Max";
        break;
      case "Max":
        this.qtmulti="1";
        break;
    }
  }

     //Permet de générer le new des managers
  onBuy(n:number){
    this.world.money=this.world.money-n;
    this.verifManagerHirable();
  }
     //Permet de générer le new des managers
  verifManagerHirable(){
    this.badgeManager=false;
    for(let i = 0; i < 6; ++i) { 
      if (this.world.managers.pallier[i].unlocked==false){
        if (this.world.money>=this.world.managers.pallier[i].seuil){
          this.badgeManager=true;
        }
      }
    } 
  }

  manager_hire(m:Pallier){
    //Vérifier que l’argent du joueur est suffisant pour acheter le manager en question.
    if(this.world.managers.pallier[m.idcible-1].unlocked==false){  
    if(this.world.money>=this.world.managers.pallier[m.idcible-1].seuil){
        //Positionner la propriété unlocked du manager à vrai. 
        this.world.managers.pallier[m.idcible-1].unlocked=true;
        this.world.products.product[m.idcible-1].managerUnlocked=true;
        //Retirer le coût du manager de l’argent possédé par le joueur.
        this.world.money=this.world.money-this.world.managers.pallier[m.idcible-1].seuil;
        //Signal manager engagé
        this.toasterService.pop('success', m.name, ' est là pour vous aider !' );
        this.badgeManager=false;
      }
    }
}







}

