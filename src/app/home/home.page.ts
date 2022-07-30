import { Component } from '@angular/core';
import { ItemService, Item } from '../item.service';
import { AlertController } from '@ionic/angular';

export interface nowShop {
  selItem: Item,
  selQuantity: string,
  total: number,
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  currentItemDef: Item = {
    id: -1,
    name: 'Type',
    quantity: -1,
    price: -1,
  }
  nowShopDef: nowShop = {
    selItem: this.currentItemDef,
    selQuantity: "-1",
    total: -1
  }
  //////////////////////
  listOfItems: Item[] = [];
  currentItem: Item = {
    id: -1,
    name: 'Type',
    quantity: -1,
    price: -1,
  };

  currentShop: nowShop = {
    selItem: this.currentItem,
    selQuantity: "-1",
    total: -1
  };

  constructor(private itemService: ItemService, private alertController: AlertController) {}

  ngOnInit(){ 
    this.itemService.createee();

    this.loadItems();

  }

  ionViewWillEnter(){
    this.loadItems();
  }

  loadItems(){
    this.itemService.getItems().then(items => {
      this.listOfItems = items;
    });
  }

  itemSelected(item): void{
    this.currentItem = item;
    this.currentShop.selItem = this.currentItem;
    this.currentShop.selQuantity = "-1";
    this.currentShop.total = -1;
  }
  
  isSelected(item){
    if(item.id == this.currentItem.id) return true;
    else return false;
  }

  quantityEntered(qnt){
    if(this.currentShop.selQuantity == "-1"){
      this.currentShop.selQuantity = qnt;
    }else{
      this.currentShop.selQuantity += `${qnt}`;
    }

    this.currentShop.total= Number(this.currentShop.selQuantity) * this.currentItem.price

  }

  async purchase(){

    if( Number(this.currentShop.selQuantity) <= this.currentItem.quantity && this.currentItem.id != -1 && Number(this.currentShop.selQuantity) != -1){
      this.currentItem.quantity -= Number(this.currentShop.selQuantity);
      this.itemService.updateItem(this.currentItem);

      //Create history
      let newHistory = {
        id: Date.now(),
        productName: this.currentItem.name,
        quantity: Number(this.currentShop.selQuantity),
        total: this.currentShop.total,
        date: Date.now()
      }
      this.itemService.createHistory(newHistory);


    }else{
      const alert = await this.alertController.create({
        header: 'Error',
        subHeader: 'Amount not avaiable',
        message: 'Please try a different amount',
        buttons: ['OK']
      });
  
      await alert.present();
    }

    this.currentItem = this.currentItemDef;
    this.currentShop = this.nowShopDef;

  }

}
