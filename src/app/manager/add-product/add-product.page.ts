import { Component, OnInit } from '@angular/core';
import { ItemService, Item } from 'src/app/item.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {

  prodctName: string;
  productPrice: number;
  productQuantity: number;

  currentItem: Item = {
    id: -1,
    name: 'Type',
    quantity: -1,
    price: -1,
  };

  constructor(private itemService: ItemService, private alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }

  async saveClicked(){
    if(this.prodctName && this.productPrice && this.productQuantity){
      
      this.currentItem.id = Date.now();
      this.currentItem.name = this.prodctName;
      this.currentItem.quantity = this.productQuantity;
      this.currentItem.price = this.productPrice;
      this.itemService.addItem(this.currentItem);

      this.router.navigate(['/manager']);

      const alert = await this.alertController.create({
        header: 'Done!',
        message: 'New Product Added Successfully',
        //buttons: ['OK']
        buttons: [{
          text: 'OK',
          handler: () => {
            this.router.navigate(['/home']);
          }
        }]
      });
  
      await alert.present();

    }else{
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'You have to provide Product Name, Price and Quantity',
        buttons: ['OK']
      });
  
      await alert.present();
    }
  }

}
