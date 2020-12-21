import { animate, animateChild, query, style, transition, trigger } from '@angular/animations';
import { Component, Inject } from '@angular/core';
import { RouterOutlet, Routes } from '@angular/router';
import { APP_ROUTES } from './app.token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeTransition', [
      transition('* => *', [
        query(':leave, :enter', style({ opacity: 1 }), { optional: true }),
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':leave', [
          style({ opacity: 1 }),
          query('@*', animateChild(), { optional: true }),
          animate('330ms linear', style({ opacity: 0 }))
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0 }),
          animate('330ms linear', style({ opacity: 1 })),
          query('@*', animateChild(), { optional: true }),
        ], { optional: true }),
      ])
    ])
  ]
})
export class AppComponent {
  title = 'ng-anime-driver-workspace';

  constructor(@Inject(APP_ROUTES) public routes: Routes) { }

  prepareRoute(outlet: RouterOutlet): string | undefined {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.path;
  }
}
