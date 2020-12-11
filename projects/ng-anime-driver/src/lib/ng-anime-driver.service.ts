import { AnimationDriver } from '@angular/animations/browser';
import { Injectable } from '@angular/core';
import { containsElement, invokeQuery, matchesElement } from './helper';
import { NgAnimeDriverPlayer } from './ng-anime-driver.player';

@Injectable({
  providedIn: 'root'
})
export class NgAnimeDriver extends AnimationDriver {

  validateStyleProperty(prop: string): boolean {
    return true;
  }

  matchesElement(element: any, selector: string): boolean {
    return matchesElement(element, selector);
  }

  containsElement(elm1: any, elm2: any): boolean {
    return containsElement(elm1, elm2);
  }

  query(element: any, selector: string, multi: boolean): any[] {
    return invokeQuery(element, selector, multi);
  }

  computeStyle(element: any, prop: string, defaultValue?: string): string {
    return (window.getComputedStyle(element) as any)[prop] as string;
  }

  animate(
    element: any,
    keyframes: { [key: string]: string | number; }[],
    duration: number,
    delay: number,
    easing?: string | null,
    previousPlayers?: any[],
    scrubberAccessRequested?: boolean
  ): any {
    return new NgAnimeDriverPlayer(element, keyframes, duration, delay, easing);
  }

}
