import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators';

import {House} from './House';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  public houseUrl = 'http://127.0.0.1:8000/houses' 

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

   
  getHouses(): Observable<House[]>{
    return this.http.get<House[]>(this.houseUrl).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<House[]>('getHouses', []))
    );

    }

  getHouse(id: number): Observable<House>{
    const url = `${this.houseUrl}/${id}`;
    return this.http.get<House>(url).pipe(
      tap(_ => this.log(`fetched house id=${id}`)),
      catchError(this.handleError<House>(`getHouse id=${id}`))
    )
  }

  addHouse(house: House): Observable<House>{
    return this.http.post<House>(this.houseUrl, house, this.httpOptions).pipe(  
      tap((newHouse: House) => this.log(`added house w/ id=${newHouse.id}`)),
      catchError(this.handleError<House>('addHouse')) 
    )
  }

  deleteHouse(house: House | number): Observable<House>{
    const id = typeof house === 'number' ? house: house.id;
    const url = `${this.houseUrl}/${id}`;

    return this.http.delete<House>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<House>('deleteHouse'))
    )
  }

  updateHouse(house: House): Observable<any>{
    return this.http.put(`${this.houseUrl}/${house.id}`, house, this.httpOptions).pipe(  
      tap(_ => this.log(`updated house id=${house.id}`)),
      catchError(this.handleError<any>('updateHouse'))
    )
  }

  getHouseNo404<Data>(id: number): Observable<House>{
    const url = `${this.houseUrl}/?id=${id}`;
    return this.http.get<House[]>(url).pipe(
      map(houses => houses[0]), tap(h=>{
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} hero id=${id}`)
      }),
      catchError(this.handleError<House>(`getHouse id=${id}`))
    )
  }


  

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> =>{
      console.error(error);

      this.log(`${operation} failed: ${error.mesage}`);

      return of(result as T);
    }
  }

  private log(message: string){
    this.messageService.add(`HouseService: ${message}`)
  }
  


}
