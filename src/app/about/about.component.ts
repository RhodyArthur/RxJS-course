import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { concat, fromEvent, interval, merge, noop, Observable, of, pipe, timer } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  //   const source1$ = of(1,2,3);
  //   const source2$ = of(4,5,6);
  //   const source3$ = of(7,8,9);
  //   const result$ = concat(source1$, source2$, source3$)

  //   result$.subscribe(val => console.log(val),
  // () => console.log('completed'))

  // const interval$= interval(1000);
  // const interval1$ = interval$.pipe(map(val => 10 * val));

  // const result$ = merge(interval$, interval1$);
  // result$.subscribe(console.log)

  const data$ = of('girl', 'boy', 'he', 'she');
    data$.pipe(delay(1000))
    .subscribe({
      next: val => console.log(val),
      error: err => console.error(err),
      complete: () => console.log('completed')
    })
}


simulateHttpRequest(url: string) {
  return timer(1000)
  .pipe(delay(1000))
}

}