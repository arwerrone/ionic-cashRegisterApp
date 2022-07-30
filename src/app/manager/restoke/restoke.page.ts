import { Component, OnInit } from '@angular/core';
import { ItemService, Item } from 'src/app/item.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-restoke',
  templateUrl: './restoke.page.html',
  styleUrls: ['./restoke.page.scss'],
})
export class RestokePage implements OnInit {

  quantityToAdd: number;
  listOfItemss: Item[] = [];

  currentItem: Item = {
    id: -1,
    name: 'Type',
    quantity: -1,
    price: -1,
  };

  constructor(private itemService: ItemService, private alertController: AlertController) { }

  ngOnInit() {
    this.loadItems();
  }

  loadItems(){
    this.itemService.getItems().then(items => {
      this.listOfItemss = items;
    });
  }

  itemSelected(item): void{
    this.currentItem = item;
  }

  isSelected(item){
    if(item.id == this.currentItem.id) return true;
    else return false;
  }

  // inputChanged(){
  //   console.log(this.quantityToAdd);
  // }

  async restockClicked(){
    if(this.quantityToAdd && this.currentItem.id != -1){
      this.currentItem.quantity = this.quantityToAdd;
      this.itemService.updateItem(this.currentItem);

    }else{
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'You have to select an Item and provide a new quantity',
        buttons: ['OK']
      });
  
      await alert.present();
    }


  }

}
