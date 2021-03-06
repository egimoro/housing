import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { House } from '../House';
import { HouseService } from '../house.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  houses: House[] = [];

  constructor(private houseService: HouseService) { }

  ngOnInit(){

    this.getHouses()
  }

  getHouses(): void{
    this.houseService.getHouses().subscribe(
      houses => this.houses = houses.slice(1,5)
    )
  }

}
