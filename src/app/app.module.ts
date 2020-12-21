import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgAnimeDriverModule } from '@lheido/ng-anime-driver';

import { AppComponent } from './app.component';
import { ComplexAnimationComponent } from './pages/complex-animation/complex-animation.component';
import { AppRoutingModule } from './app-routing.module';
import { StaggerAnimationComponent } from './pages/stagger-animation/stagger-animation.component';
import { KeyframesAnimationComponent } from './pages/keyframes-animation/keyframes-animation.component';
import { ControlAnimationComponent } from './pages/control-animation/control-animation.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ComplexAnimationComponent,
    StaggerAnimationComponent,
    KeyframesAnimationComponent,
    ControlAnimationComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgAnimeDriverModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
