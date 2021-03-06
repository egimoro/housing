import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HousesComponent} from './houses/houses.component';
import { HouseDetailComponent } from './house-detail/house-detail.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'houses/:id', component: HouseDetailComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'houses', component: HousesComponent} 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
