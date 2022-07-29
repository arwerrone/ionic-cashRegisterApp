import { Component, OnInit } from '@angular/core';
import { ItemService, History} from 'src/app/item.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  listOfHistory: History[] = [];

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory(){
    this.itemService.getHistory().then(histories => {
      this.listOfHistory = histories;
    });
  }

}
