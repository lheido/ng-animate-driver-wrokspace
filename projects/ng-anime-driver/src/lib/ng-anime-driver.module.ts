import { AnimationDriver } from '@angular/animations/browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgAnimeDriver } from './ng-anime-driver.service';



@NgModule({
  declarations: [],
  imports: [
    BrowserAnimationsModule
  ],
  providers: [
    { provide: AnimationDriver, useClass: NgAnimeDriver }
  ],
  exports: []
})
export class NgAnimeDriverModule { }
