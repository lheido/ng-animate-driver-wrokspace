/* tslint:disable */
/**
 * Copy a part of an Angular shared file from https://github.com/angular/angular/blob/a6971ba89adc253bfa4260036ee4a1e0bd76159f/packages/animations/browser/src/render/shared.ts
 * The file is not shared to others...
 */
/* tslint:enable */

// We don't include ambient node types here since @angular/animations/browser
// is meant to target the browser so technically it should not depend on node
// types. `process` is just declared locally here as a result.
declare const process: any;

export function checkIsBrowser(): boolean {
  return (typeof window !== 'undefined' && typeof window.document !== 'undefined');
}

export function checkIsNode(): boolean {
  // Checking only for `process` isn't enough to identify whether or not we're in a Node
  // environment, because Webpack by default will polyfill the `process`. While we can discern
  // that Webpack polyfilled it by looking at `process.browser`, it's very Webpack-specific and
  // might not be future-proof. Instead we look at the stringified version of `process` which
  // is `[object process]` in Node and `[object Object]` when polyfilled.
  return typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';
}

export const isNode = checkIsNode();
export const isBrowser = checkIsBrowser();

let _contains: (elm1: any, elm2: any) => boolean = (elm1: any, elm2: any) => false;
let _matches: (element: any, selector: string) => boolean = (element: any, selector: string) => false;
let _query: (element: any, selector: string, multi: boolean) => any[] =
  (element: any, selector: string, multi: boolean) => {
    return [];
  };

if (isNode || typeof Element !== 'undefined') {
  // this is well supported in all browsers
  _contains = (elm1: any, elm2: any) => {
    return elm1.contains(elm2) as boolean;
  };

  _matches = (() => {
    if (isNode || Element.prototype.matches) {
      return (element: any, selector: string) => element.matches(selector);
    } else {
      const proto = Element.prototype as any;
      const fn = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector ||
        proto.oMatchesSelector || proto.webkitMatchesSelector;
      if (fn) {
        return (element: any, selector: string) => fn.apply(element, [selector]);
      } else {
        return _matches;
      }
    }
  })();

  _query = (element: any, selector: string, multi: boolean): any[] => {
    const results: any[] = [];
    if (multi) {
      results.push(...element.querySelectorAll(selector));
    } else {
      const elm = element.querySelector(selector);
      if (elm) {
        results.push(elm);
      }
    }
    return results;
  };
}

export const matchesElement = _matches;
export const containsElement = _contains;
export const invokeQuery = _query;

export const easingMap: { [key: string]: string } = {
  'ease-in': 'easeInCubic',
  'ease-out': 'easeOutCubic',
  'ease-in-out': 'easeInOutCubic',
  'cubic-bezier': 'cubicBezier'
};

export interface Keyframe {
  [key: string]: string | number;
}

export function convertKeyframes(
  keyframes: Keyframe[],
  duration: number
): Keyframe[] {
  const clones: Keyframe[] = JSON.parse(JSON.stringify(keyframes));

  for (const [keyframeIndex, keyframe] of clones.entries()) {
    // Convert transform property to the animejs format.
    if (keyframe.transform !== undefined) {
      const transforms = (keyframe.transform as string).split(') ');
      for (const transformFn of transforms) {
        const [fn, _values] = transformFn.replace(/\)$/, '').split('(');
        if (fn !== 'none') {
          const values: (string | number)[] = _values.split(',').map((val: string) => val.trim());
          const axis = ['X', 'Y', 'Z'];
          if ((['translate', 'rotate', 'skew', 'scale'].includes(fn) && values.length > 1)) {
            for (const indexValue in values) {
              if (Object.prototype.hasOwnProperty.call(values, indexValue)) {
                keyframe[`${fn}${axis[indexValue]}`] = values[indexValue];
              }
            }
          } else {
            (keyframe as any)[fn] = values[0];
          }
        }
      }
      delete keyframe.transform;
    }

    // Take into account durations (using keyframe offset).
    if (keyframeIndex === 0) {
      keyframe.duration = 0;
    } else {
      keyframe.duration = (keyframe.offset as number * duration) - (clones[keyframeIndex - 1].duration as number);
    }
    delete keyframe.offset;

    // Convert CSS easing syntax and move to the correct keyframe.
    if (keyframeIndex > 0 && clones[keyframeIndex - 1].easing !== undefined) {
      const easing = clones[keyframeIndex - 1].easing;
      keyframe._easing = easingMap[easing] || easing;
    }
  }

  // Clean keyframes and return them.
  return clones.map(keyframe => {
    delete keyframe.easing;
    if (keyframe._easing !== undefined) {
      keyframe.easing = keyframe._easing;
      delete keyframe._easing;
    }
    return keyframe;
  });
}

export function convertEasing(easing: string): string {
  return easing;
}
