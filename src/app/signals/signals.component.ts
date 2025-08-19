import { Component, effect, OnInit, signal } from '@angular/core';
import { count } from 'console';

@Component({
  selector: 'app-signals',
  standalone: true,
  imports: [],
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.scss'
})
export class SignalsComponent implements OnInit {
  counter = signal(0);
  showCount = signal(false);
  derivedCounter = computed(() => {
    return this.counter() + 10;
  })

  ngOnInit(){
    

  }


  setCount(){
    // Update with Set 
    this.counter.set(this.counter() + 1);

    // Update with update. Update takes a function
    this.counter.update(counter => counter + 1); 
  }
}


function computed(arg0: () => number) {
  throw new Error('Function not implemented.');
}

/** 
 *  effect is an operation that runs whenever one or more signal values change.
 * 
 * For: 
 * Logging data being displayed and when it changes, either for analytics or as a debugging tool.
    Keeping data in sync with window.localStorage.
    Adding custom DOM behavior that can't be expressed with template syntax.
    Performing custom rendering to a <canvas>, charting library, or other third party UI library.

 */
effect(() => {
  console.log(`The current count is: ${count()}`);
});

/**
 * tracks how and where state is used 
 * allows framework to optimize 
 * meant to be a reactive primative that allows fine grained updates to the DOM 
 * Get rid of zone.js and increates runtime performance 
 * 
 * 
 * 
 * Main advantage is that we get notified when signal changes and then do something when the change happens
 */
