import {Component, OnInit} from '@angular/core';
import {GetMcDonaldsStoreByStateCodeService} from "./services/get-mc-donalds-store-by-state-code.service";
import {McDonalds} from "../model/mcdonalds";
import {ITdDataTableColumn} from "@covalent/core";

@Component({
  selector: 'app-mcdonalds',
  templateUrl: './mcdonalds.component.html',
  styleUrls: ['./mcdonalds.component.scss']
})
export class McdonaldsComponent implements OnInit {


  private data: any[] = [];
  private columns: ITdDataTableColumn[] = [
    {name: 'latitude', label: 'Latitude', tooltip: 'Store GPS', width: 150},
    {name: 'longitude', label: 'Longitude', tooltip: 'Store GPS', width: 150},
    {name: 'storeName', label: 'Name', width: 300, sortable: true},
    {name: 'fullAddress', label: 'Address',  width:500},
  ];

  constructor(private _mcDonaldsService: GetMcDonaldsStoreByStateCodeService) {
  }

  ngOnInit() {
  }

  filterMcdonaldsSotre(stateCode: string = ''): void {
    if(stateCode.length>=1){
      this._mcDonaldsService.getMcDonaldsStoreByStateCode(stateCode).subscribe(data => {
        this.data = [];
       this.fillDataArray(JSON.parse(data._body));
      }, error => {
        this.data = [];
      });
    }

  }

  fillDataArray(data:any):void{
    for (var item in data) {
      let dataItem = {
        latitude: data[item]["mcDonaldsGpsPosition"]["latitude"] ,
        longitude: data[item]["mcDonaldsGpsPosition"]["longitude"],
        storeName: data[item]["storeName"],
        fullAddress: data[item]["fullAddress"]
      }
      this.data.push(dataItem)
    }
  }

}
