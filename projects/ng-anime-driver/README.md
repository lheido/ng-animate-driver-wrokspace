# NgAnimeDriver

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.3.

## Install

Run the following command: `npm install animejs @lheido/ng-anime-driver`.

If you encounter a warning using animejs you may add the following line to your `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true
  }
}
```

## How to use

Simply add the `NgAnimeDriverModule` in your `app.module.ts`:

```typescript
import { NgModule } from '@angular/core';

import { NgAnimeDriverModule } from '@lheido/ng-anime-driver';

@NgModule({
  imports: [
    // ...
    NgAnimeDriverModule
  ],
})
export class AppModule { }

```

Then you can define your animations as usual with Angular syntax.

```typescript
import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('myAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 })),
      ])
    ]),
  ]
})
export class AppComponent {}

```

Or using the `AnimationBuilder` (no need to use a polyfill):

```typescript
import { animate, style, AnimationBuilder } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(private animationBuilder: AnimationBuilder) {
    this.animationBuilder.build([
      style({ opacity: 0 }),
      animate(1000, style({ opacity: 1 })),
    ]).create(/* your html element */).play();
  }

}

```
