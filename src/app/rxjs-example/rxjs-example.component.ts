import { Component } from '@angular/core';
import { catchError, combineLatest, delay, filter, finalize, from, interval, map, of, switchMap, take, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-rxjs-example',
  standalone: true,
  imports: [],
  templateUrl: './rxjs-example.component.html',
  styleUrl: './rxjs-example.component.scss'
})
export class RxjsExampleComponent {

  ngOnInit() {
    this.demoCreationOperators();
    this.demoTransformationOperators();
    this.demoFilteringOperators();
    this.demoCombinationOperators();
    this.demoErrorHandlingOperators();
    this.demoUtilityOperators();
  }


  demoCreationOperators() {
    console.log('--- Creation Operators ---');
    of(1, 2, 3).subscribe(value => console.log('of:', value)); 
    from([10, 20, 30]).subscribe(value => console.log('from:', value)); 
    interval(1000).pipe(take(3)).subscribe(value => console.log('interval:', value)); 
  }

  demoTransformationOperators() {
    console.log('--- Transformation Operators ---');
    of(1, 2, 3)
      .pipe(map(value => value * 2))
      .subscribe(value => console.log('map:', value)); // Emits 2, 4, 6

    of(1, 2, 3)
      .pipe(
        switchMap(value => of(`Mapped Value: ${value}`).pipe(delay(500)))
      )
      .subscribe(value => console.log('switchMap:', value)); // Emits "Mapped Value: 1", "Mapped Value: 2", etc.
  }

  demoFilteringOperators() {
    console.log('--- Filtering Operators ---');
    of(1, 2, 3, 4, 5)
      .pipe(filter(value => value % 2 === 0))
      .subscribe(value => console.log('filter:', value)); // Emits 2, 4

    interval(500)
      .pipe(take(3))
      .subscribe(value => console.log('take:', value)); // Emits 0, 1, 2
  }

  demoCombinationOperators() {
    console.log('--- Combination Operators ---');
    const obs1 = of('A', 'B', 'C');
    const obs2 = interval(1000).pipe(take(3));
    combineLatest([obs1, obs2]).subscribe(([val1, val2]) =>
      console.log('combineLatest:', val1, val2)
    ); // Emits combinations of the latest values from both observables
  }

  demoErrorHandlingOperators() {
    console.log('--- Error Handling Operators ---');
    throwError('An error occurred!')
      .pipe(catchError(err => of(`Recovered from: ${err}`)))
      .subscribe(value => console.log('catchError:', value)); // Emits "Recovered from: An error occurred!"
  }

  demoUtilityOperators() {
    console.log('--- Utility Operators ---');
    of(1, 2, 3)
      .pipe(
        tap(value => console.log('tap (before):', value)),
        map(value => value * 10),
        tap(value => console.log('tap (after):', value)),
        finalize(() => console.log('finalize: Stream completed'))
      )
      .subscribe(value => console.log('final value:', value)); // Emits 10, 20, 30
  }

  
}
