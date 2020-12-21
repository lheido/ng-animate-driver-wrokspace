import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <div class="stagger-wrapper" [@stagooo]="stagooo" (@stagooo.done)="restartStagooo()">
      <div class="item" id="sa-1"></div>
      <div class="item" id="sa-2"></div>
      <div class="item" id="sa-3"></div>
      <div class="item" id="sa-4"></div>
    </div>
  `,
  styles: [':host { display: block; width: 100%; height: 100%; position: absolute; }'],
  animations: [
    trigger('stagooo', [
      transition(':increment, :decrement', [
        query('.item', [
          style({ opacity: 0 }),
          stagger('0.5s', animate('1.5s linear', style({ opacity: 1 }))),
          animate('2s linear', style({ opacity: 0 })),
        ])
      ])
    ]),
  ]
})
export class StaggerAnimationComponent implements OnInit {

  stagooo = Math.random();

  constructor() { }

  ngOnInit(): void {
  }

  restartStagooo(): void {
    this.stagooo = Math.random();
  }

}
