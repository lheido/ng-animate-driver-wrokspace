import { trigger, transition, query, stagger, animate, keyframes, style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <div class="keyframes-wrapper" [@keyframooo]="keyframooo" (@keyframooo.done)="restartKeyframooo()">
      <div class="item" id="ka-1"></div>
      <div class="item" id="ka-2"></div>
      <div class="item" id="ka-3"></div>
      <div class="item" id="ka-4"></div>
    </div>
  `,
  styles: [':host { display: block; width: 100%; height: 100%; position: absolute; }'],
  animations: [
    trigger('keyframooo', [
      transition(':increment, :decrement', [
        query('.item', [
          stagger('0.5s', animate('4s linear', keyframes([
            style({ opacity: 0, scaleY: 1, offset: 0 }),
            style({ opacity: 1, scaleY: 1, offset: 0.5 }),
            style({ opacity: 0, scaleY: 0.5, offset: 1 }),
          ]))),
        ])
      ])
    ]),
  ]
})
export class KeyframesAnimationComponent implements OnInit {
  keyframooo = Math.random();

  constructor() { }

  restartKeyframooo(): void {
    this.keyframooo = Math.random();
  }

  ngOnInit(): void {
  }

}
