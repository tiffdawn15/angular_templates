import { of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  handleDependentApiCalls() {
    this.http.get('https://api.example.com/getUserId')
      .pipe(
        switchMap((userId: any) => this.http.get(`https://api.example.com/getUserDetails/${userId}`)),
        switchMap((userDetails: any) => this.http.get(`https://api.example.com/getUserData/${userDetails.id}`)),
        catchError(error => {
          console.error('Error occurred:', error);
          return of(null); 
        })
      )
      .subscribe(result => {
        console.log('Final result:', result);
      });
  }
}

/**
 *  Switch Map: 
 *  -- Cancels the pervious inner olsbservable when a new value is emitted by the source observable
 * -- Use when only the latest result matters
 * -- (Serach box input)
 * 
 * Merge Map: 
 * -- Subscribes to all inner observables concurrently adn merges their results 
 * -- process all emitted values concurrently without cancelling any 
 * -- Fetching data for multiple items simultaneously 
 * 
 * concatMap: 
 * -- queues up inner observables and processes them one at a time in order
 * -- use when order of execution matters & you need to wait for one observable to complete before starting the next 
 * -- Sequential api calls where the order is important 
 * 
 * 
 * exhaustMap: 
 *  -- ignores new emissions from the source observable while the current inner observable is still active 
 * -- use when you want to ignore new triggers until the current processs completes 
 * -- ie. preventing multiple clicks ona  button from triggering duplicate api calls 
 */