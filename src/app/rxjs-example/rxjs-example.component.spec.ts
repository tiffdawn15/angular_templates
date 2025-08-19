import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { RxjsExampleComponent } from './rxjs-example.component';
import { map } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

describe('RxjsExampleComponent', () => {
  let component: RxjsExampleComponent;
  let fixture: ComponentFixture<RxjsExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsExampleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RxjsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test "of" creation operator', () => {
    const spy = spyOn(console, 'log');
    component.demoCreationOperators();
    expect(spy).toHaveBeenCalledWith('of:', 1);
    expect(spy).toHaveBeenCalledWith('of:', 2);
    expect(spy).toHaveBeenCalledWith('of:', 3);
  });

  it('should test "from" creation operator', () => {
    const spy = spyOn(console, 'log');
    component.demoCreationOperators();
    expect(spy).toHaveBeenCalledWith('from:', 10);
    expect(spy).toHaveBeenCalledWith('from:', 20);
    expect(spy).toHaveBeenCalledWith('from:', 30);
  });
  
  it('should test "interval" creation operator with fakeAsync', fakeAsync(() => {
    const spy = spyOn(console, 'log');
    component.demoCreationOperators();
    tick(3000);
    expect(spy).toHaveBeenCalledWith('interval:', 0);
    expect(spy).toHaveBeenCalledWith('interval:', 1);
    expect(spy).toHaveBeenCalledWith('interval:', 2);
  }));

  it('should test transformation operators using TestScheduler', () => {
    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    testScheduler.run(({ cold, expectObservable }) => {
      const source$ = cold('a-b-c|', { a: 1, b: 2, c: 3 });
      const result$ = source$.pipe(map(value => value * 10));
      expectObservable(result$).toBe('a-b-c|', { a: 10, b: 20, c: 30 });
    });
  });
});
