import { animate, group, sequence, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fooo', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translate(-10%, 0)' }),
        group([
          animate('2s linear', style({ opacity: 1 })),
          sequence([
            animate('1s', style({ transform: 'translate(0, 0)' })),
            animate('1s', style({ transform: 'scale(0.5) rotate(0.5turn)' })),
            animate('1s linear', style({ transform: 'scale(1)' })),
            animate('1s', style({ transform: 'rotate(1turn)' })),
          ])
        ]),
      ])
    ])
  ]
})
export class AppComponent {
  title = 'ng-anime-driver-workspace';

  @ViewChild('content', { static: true }) content!: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) { }

  animationStart(): void {
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  animationDone(): void {
    this.renderer.setStyle(document.body, 'overflow', 'auto');
  }

}
