import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Item {
  id: number,
  name: string,
  quantity: number,
  price: number,
}

const ITEMS_KEY = 'my-items';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private storage: Storage) { }

    createee(){
      this.storage.create();
    }

  addItem(item: Item){
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if(!items || items.length === 0){
        return this.storage.set(ITEMS_KEY, [item]);

      }else{

        let ok = false;

        for (let i of items){
          if(i.id == item.id){
            ok = true;
          }
        }

        if(!ok){
          if(items){
            items.push(item);
            return this.storage.set(ITEMS_KEY, items);
          }
        }else{
          console.log("Item with such ID already exists");
        }
      }
      

    });
  }

  getItems(): Promise<Item[]>{
    return this.storage.get(ITEMS_KEY);
    //return [...this.items]; //hard coded
  }

  updateItem(item: Item){
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if(!items || items.length === 0){
        return null;
      }
      
      let newItems: Item[] = [];

      for (let i of items){
        if(i.id === item.id){
          newItems.push(item);
        }else{
          newItems.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, newItems);
    });
  }

  deleteItem(id: number){
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if(!items || items.length === 0){
        return null;
      }

      let toKeep: Item[] = [];

      for (let i of items){
        if(i.id != id){
          toKeep.push(i);
        }
      }

      return this.storage.set(ITEMS_KEY, toKeep);

    });
  }

}
