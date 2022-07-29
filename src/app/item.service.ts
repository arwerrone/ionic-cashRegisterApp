import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Item {
  id: number,
  name: string,
  quantity: number,
  price: number,
}

export interface History {
  id: number,
  productName: string,
  quantity: number,
  total: number,
  date: number
}

const ITEMS_KEY = 'my-items';
const HISTOKY_KEY = 'my-history';

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

  ////////////HISTORY
  
  createHistory(history: History){
    return this.storage.get(HISTOKY_KEY).then((histories: History[]) => {
      if(histories){
        histories.push(history);
        return this.storage.set(HISTOKY_KEY, histories);
      }else{
        return this.storage.set(HISTOKY_KEY, [history]);
      }
    })

  }

  getHistory(): Promise<History[]>{
    return this.storage.get(HISTOKY_KEY);
  }

  getHistoryDetail(id){
    return this.storage.get(HISTOKY_KEY).then((histories: History[]) => {
      for(let i of histories){
        if(i.id == id){
          return i;
        }
      }
    })
  }  

}
