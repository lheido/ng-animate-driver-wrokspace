import { AnimationPlayer } from '@angular/animations';
import { convertKeyframes } from './helper';
import anime, { AnimeInstance } from 'animejs';

export class NgAnimeDriverPlayer implements AnimationPlayer {
  private _onDoneFns: (() => void)[] = [];
  private _onStartFns: (() => void)[] = [];
  private _onDestroyFns: (() => void)[] = [];
  private _initialized = false;
  private _finished = false;
  private _started = false;
  private _destroyed = false;

  parentPlayer: AnimationPlayer | null = null;
  beforeDestroy?: (() => any) | undefined;
  keyframes: { [key: string]: string | number; }[];
  player!: AnimeInstance;

  constructor(
    public element: any,
    keyframes: { [key: string]: string | number; }[],
    public duration: number,
    public delay: number,
    easing?: string | null
  ) {
    // Convert Angular keyframes to animejs format (transform property).
    this.keyframes = convertKeyframes(keyframes, duration);
  }

  get totalTime(): number {
    return this.delay + this.duration;
  }

  onDone(fn: () => void): void {
    this._onDoneFns.push(fn);
  }

  onStart(fn: () => void): void {
    this._onStartFns.push(fn);
  }

  onDestroy(fn: () => void): void {
    this._onDestroyFns.push(fn);
  }

  init(): void {
    this.builPlayer();
  }

  hasStarted(): boolean {
    return this._started;
  }

  play(): void {
    this.builPlayer();
    if (!this.hasStarted()) {
      this._onStartFns.forEach(fn => fn());
      this._onStartFns = [];
      this._started = true;
    }
    this.player.play();
  }

  pause(): void {
    this.init();
    this.player.pause();
  }

  restart(): void {
    this.reset();
    this.play();
  }

  finish(): void {
    this.init();
    this._onFinish();
    this.player.seek(this.totalTime);
  }

  destroy(): void {
    if (!this._destroyed) {
      this._destroyed = true;
      this._onFinish();
      this._onDestroyFns.forEach(fn => fn());
      this._onDestroyFns = [];
    }
  }

  reset(): void {
    this._resetPlayerState();
    this._destroyed = false;
    this._finished = false;
    this._started = false;
  }

  setPosition(position: number): void {
    this.player.seek(position * this.player.duration);
  }

  getPosition(): number {
    return this.player.progress / 100;
  }

  private builPlayer(): void {
    if (this._initialized) { return; }
    this._initialized = true;
    this.player = anime({
      targets: this.element,
      keyframes: this.keyframes,
      autoplay: false,
      delay: this.delay
    });
    this.player.finished.then(() => this._onFinish());
  }

  private _onFinish(): void {
    if (!this._finished) {
      this._finished = true;
      this._onDoneFns.forEach(fn => fn());
      this._onDoneFns = [];
    }
  }

  private _resetPlayerState(): void {
    if (this.player) {
      this.player.restart();
      this.player.pause();
    }
  }

}
