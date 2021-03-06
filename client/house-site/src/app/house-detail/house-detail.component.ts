import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { House} from '../House';
import { HouseService} from '../house.service';

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.scss']
})
export class HouseDetailComponent implements OnInit {

  house: House;

  constructor(
    private route: ActivatedRoute,
    private houseService: HouseService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHouse();
  }

  getHouse(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.houseService.getHouse(id).subscribe(
      house => this.house = house
    );
  }

  goBack(): void{
    this.location.back();
  }

  save(): void{
    this.houseService.updateHouse(this.house).subscribe(
      () => this.goBack()
    );
  }

}
