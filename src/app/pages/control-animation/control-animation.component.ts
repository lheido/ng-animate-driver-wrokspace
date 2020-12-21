import { animate, AnimationBuilder, keyframes, query, style } from '@angular/animations';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  template: `
    <div class="control-wrapper" #wrapper>
      <div class="item"></div>
      <input type="range" min="0.0" max="1" step="0.01" [formControl]="control">
    </div>
  `,
  styles: [':host { display: block; width: 100%; height: 100%; position: absolute; }'],
})
export class ControlAnimationComponent implements OnInit, OnDestroy {

  control = new FormControl(Math.random());

  @ViewChild('wrapper', { static: true }) private wrapper!: ElementRef<HTMLElement>;
  private unsubscriber = new Subject();

  constructor(private ab: AnimationBuilder) { }

  ngOnInit(): void {
    const player = this.ab.build([
      query('.item', [
        animate('3s linear', keyframes([
          style({ borderRadius: '0%', transform: 'translate(-100%, -100%)', offset: 0 }),
          style({ borderRadius: '25%', transform: 'translate(100%, -100%)', offset: 0.25 }),
          style({ borderRadius: '50%', transform: 'translate(100%, 100%)', offset: 0.5 }),
          style({ borderRadius: '25%', transform: 'translate(-100%, 100%)', offset: 0.75 }),
          style({ borderRadius: '0%', transform: 'translate(-100%, -100%)', offset: 1 }),
        ]))
      ])
    ]).create(this.wrapper.nativeElement);
    player.pause();
    player.setPosition(this.control.value);
    this.control.valueChanges.pipe(takeUntil(this.unsubscriber)).subscribe(value => {
      player.pause();
      player.setPosition(value);
    });
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

}
