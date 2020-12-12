import { animate, group, keyframes, query, sequence, stagger, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fooo', [
      transition(':enter', [
        group([
          query('.item:nth-child(1)', [
            animate('2s linear', style({ opacity: 1 })),
            animate('700ms', style({ transform: 'translate(-100%, -100%)' })),
            animate('650ms linear', style({ transform: 'translate(100%, -100%)' })),
            animate('700ms', style({ transform: 'translate(100%, 100%)' })),
            animate('550ms linear', style({ transform: 'translate(-100%, 100%)' })),
            animate('700ms', style({ transform: 'translate(-50%, -50%)' })),
            animate('700ms', style({ borderTopLeftRadius: '100%' })),
            animate('330ms linear', style({ transform: 'translate(0,0) scale(0.9)', borderRadius: '50%' })),
            animate('2s easeOutElastic(1, .8)', style({ transform: 'scale(3)' })),
            animate('1s linear', style({ opacity: 0 })),
          ]),
          query('.item:nth-child(2)', [
            animate('2s linear', style({ opacity: 1 })),
            animate('700ms', style({ transform: 'translate(100%, -100%)' })),
            animate('650ms linear', style({ transform: 'translate(100%, 100%)' })),
            animate('700ms', style({ transform: 'translate(-100%, 100%)' })),
            animate('550ms linear', style({ transform: 'translate(-100%, -100%)' })),
            animate('700ms', style({ transform: 'translate(50%, -50%)' })),
            animate('700ms', style({ borderTopRightRadius: '100%' })),
            animate('330ms linear', style({ transform: 'translate(0,0) scale(0.9)', borderRadius: '50%' })),
            animate('2s 2s easeOutElastic(2, .8)', style({ transform: 'scale(3)' })),
            animate('1s linear', style({ opacity: 0 })),
          ]),
          query('.item:nth-child(3)', [
            animate('2s linear', style({ opacity: 1 })),
            animate('700ms', style({ transform: 'translate(-100%, 100%)' })),
            animate('650ms linear', style({ transform: 'translate(-100%, -100%)' })),
            animate('700ms', style({ transform: 'translate(100%, -100%)' })),
            animate('550ms linear', style({ transform: 'translate(100%, 100%)' })),
            animate('700ms', style({ transform: 'translate(-50%, 50%)' })),
            animate('700ms', style({ borderBottomLeftRadius: '100%' })),
            animate('330ms linear', style({ transform: 'translate(0,0) scale(0.9)', borderRadius: '50%' })),
            animate('2s 4s easeOutElastic(3, .8)', style({ transform: 'scale(3)' })),
            animate('1s linear', style({ opacity: 0 })),
          ]),
          query('.item:nth-child(4)', [
            animate('2s linear', style({ opacity: 1 })),
            animate('700ms', style({ transform: 'translate(100%, 100%)' })),
            animate('650ms linear', style({ transform: 'translate(-100%, 100%)' })),
            animate('700ms', style({ transform: 'translate(-100%, -100%)' })),
            animate('550ms linear', style({ transform: 'translate(100%, -100%)' })),
            animate('700ms', style({ transform: 'translate(50%, 50%)' })),
            animate('700ms', style({ borderBottomRightRadius: '100%' })),
            animate('330ms linear', style({ transform: 'translate(0,0) scale(1.1)', borderRadius: '50%' })),
            animate('2s easeOutElastic(4, .6)', style({ transform: 'scale(1.3)' })),
            animate('2s easeOutElastic(4, .6)', style({ transform: 'scale(1.5)' })),
            animate('2s easeOutElastic(4, .6)', style({ transform: 'scale(1.7)' })),
            animate('1s linear', style({ transform: 'scale(0)' }))
          ]),
        ])
      ])
    ]),
    trigger('stagooo', [
      transition('* <=> *', [
        query('.item', [
          style({ opacity: 0 }),
          stagger('0.5s', animate('1.5s linear', style({ opacity: 1 }))),
          animate('2s linear', style({ opacity: 0 })),
        ])
      ])
    ]),
    trigger('keyframooo', [
      transition('* <=> *', [
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
export class AppComponent {
  title = 'ng-anime-driver-workspace';
  stagooo = Math.random();
  keyframooo = Math.random();

  restartStagooo(): void {
    this.stagooo = Math.random();
  }

  restartKeyframooo(): void {
    this.keyframooo = Math.random();
  }
}
