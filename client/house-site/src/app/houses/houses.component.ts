import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';

import { House} from '../House';
import { HouseService } from '../house.service';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.scss']
})
export class HousesComponent implements OnInit {

  houses: House[];

  constructor(private houseService: HouseService) { }

  ngOnInit() {

    this.getHouses()
  }

  getHouses(): void{
    this.houseService.getHouses().subscribe(
      houses => this.houses = houses
    );
  }


  add(house_type: string, seller: string, price:number): void{
    house_type = house_type.trim();
    seller = seller.trim();

    if (!house_type) {return;}
    if (!seller) { return;}
    if (!price) { return;}

    this.houseService.addHouse({house_type, seller, price} as House).subscribe(
      house => {
        this.houses.push(house);
      }   
    )
  }

  delete(house: House): void{
    this.houses = this.houses.filter(h =>h !== house);
    this.houseService.deleteHouse(house).subscribe()
  }

}
