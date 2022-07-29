import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ItemService, History} from 'src/app/item.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  historyDetail: History = {
    id: 0,
    productName: 'bad',
    quantity: 0,
    total: 0,
    date: 0
  };

  constructor(private itemService: ItemService, private activated_route: ActivatedRoute) { }

  ngOnInit() {
    this.activated_route.params.subscribe((data: Params) => {
      const id = data['history_id'];
      this.getDetails(id);
    })

  }

  getDetails(id){
    this.itemService.getHistoryDetail(id).then(history =>{
      //this.historyDetail = history;
      this.historyDetail.id = history.id;
      this.historyDetail.productName = history.productName;
      this.historyDetail.quantity = history.quantity;
      this.historyDetail.total = history.total;
      this.historyDetail.date = history.date;
    });
  }


}
