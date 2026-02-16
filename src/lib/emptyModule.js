// FILE: src/lib/emptyModule.js
// Empty module stub for optional dependencies we don't use (e.g. hls.js)
export const Events = {};
export const ErrorTypes = {};
export const ErrorDetails = {};
export default class Hls {
  static isSupported() {
    return false;
  }
  static get Events() {
    return Events;
  }
}
