import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/world';
import { Input } from '@angular/core';
import { RestserviceService } from '../restservice.service';
import { ViewChild } from '@angular/core';
import { World } from '../world';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

declare var require;
const ProgressBar = require("progressbar.js");

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

  @ViewChild('bar') progressBarItem;

  constructor(private service: RestserviceService) {
    this.server = service.getServer();
  }

  progressbar: any;
  lastupdate: any;
  maxbuy: number;
  server: string;
  product: Product;
  quantiteBouton: number;
  //argent: number;
  //world: any;

  ngOnInit() {
    this.progressbar = new ProgressBar.Line(this.progressBarItem.nativeElement, { strokeWidth: 50, color: '#CEDDB4' });
    setInterval(() => { this.calcScore(); }, 100);
    this.world = this.service.getWorld();
  }

  startFabrication(){
    if (this.product.quantite >= 0) {
      this.progressbar.animate(1, { duration: this.product.vitesse });
      this.product.timeleft = this.product.vitesse;
      this.lastupdate = Date.now();
    }
  }



  calcScore() {
    var temps_ecoule: any;
    //var gain: number;
    //if (this.product.timeleft = 0) {
      //le produit n'est pas en cours de production
    //}

    if(this.product) {
      if (this.product.timeleft > 0) {
        //calcul temps écoulé depuis dernière mise à jour
        temps_ecoule = Date.now() - this.lastupdate;
        this.product.timeleft = this.product.timeleft - temps_ecoule;
        this.lastupdate = Date.now();
  
        if (this.product.timeleft < 0) {
          //noter ce que rapporte le produit
          //this.world.money += this.product.revenu;
          // prévenir composant parent que le produit a généré du revenu

          this.product.timeleft=0;
          this.notifyProduction.emit(this.product);
          //remettre barre de progression à 0
          this.progressbar.set(0);
  
          //remise à 0 si production terminée
          //this.product.timeleft = 0;
        }
      }
      this.calcMaxCanBuy();  
      if (this.product.managerUnlocked==true){
        this.startFabrication();
      }
    }
  }

  calcMaxCanBuy() {
    var x: number = this.product.revenu;
    var n: number = 0;
    var rev: number = x;

    do {
      rev += rev * Math.pow(this.product.croissance, n);
      n++;
    } while (rev < this.world.money);
    
    this.maxbuy = n;
  }

  //convertir la variable du bouton d'un string à un number
  changeQuantite(valeur: string) {
    switch (valeur) {
      case "1":
        this.quantiteBouton = 1;
        break;
      case "10":
        this.quantiteBouton = 10;
        break;
      case "100":
        this.quantiteBouton = 100;
        break;
      case "Max":
        this.quantiteBouton = this.maxbuy;
        break;
    }
  }

  acheter(){
    if(this.world.money >= this.quantiteBouton * this.product.cout){
      this.product.cout= this.product.cout*(Math.pow(this.product.croissance, this.quantiteBouton));
      this.world.money= this.world.money - this.quantiteBouton * this.product.cout;
      this.product.quantite += this.quantiteBouton;
      console.log("peut acheter");
      this.notifyAchat.emit(this.quantiteBouton* this.product.cout);
    }
    else{
      //griser le bouton ou incliquable
      console.log(this.world.money);
    };
  }


  calculUnlocks(){
    //calculer si l'achat d'un produit fait passer un seuil dans les upgrades
    for(let p of this.product.palliers.pallier) { 
      if (this.product.palliers.pallier[p.idcible-1].unlocked==false){
        if (this.product.quantite>=this.product.palliers.pallier[p.idcible-1].seuil){
          this.product.palliers.pallier[p.idcible-1].unlocked=true;
          if (this.product.palliers.pallier[p.idcible-1].typeratio=="vitesse"){
            this.product.vitesse=this.product.vitesse*this.product.palliers.pallier[p.idcible-1].ratio;
          }else if (this.product.palliers.pallier[p.idcible-1].typeratio=="gain"){
            this.product.revenu=this.product.revenu*this.product.palliers.pallier[p.idcible-1].ratio;
          }
        }
      }
    }
  }






  @Input("monde") world;

  @Input()
  set qtmulti(value: string) {
    if (this.product) {
      this.calcMaxCanBuy();
      this.changeQuantite(value);
    }
  }


  //récupérer la valeur de world.money
  @Input()
  set money(value: number) {
    this.world.money = value;
    this.calcMaxCanBuy();
  }

  @Input()
  set prod(value: Product) {
    this.product = value;
  }

  //evenement de sortie qui permet de faire le lien entre le composant parent et le composant produit
  @Output()
  notifyProduction: EventEmitter<Product> = new EventEmitter<Product>();

  @Output()
  notifyAchat: EventEmitter<number>= new EventEmitter<number>();



}


