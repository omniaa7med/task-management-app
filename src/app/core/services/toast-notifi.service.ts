import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastNotifService {
  toasts: string[] = [];

  show(message: string, duration: number = 1500) {
    this.toasts.push(message);
    setTimeout(() => {
      this.toasts.shift();
    }, duration);
  }
}
