import { Component, inject } from '@angular/core';
import { ToastNotifService } from '../../../core/services/toast-notifi.service';

@Component({
  selector: 'app-toast-notif',
  standalone: false,
  templateUrl: './toast-notif.component.html',
  styleUrl: './toast-notif.component.scss',
})
export class ToastNotifComponent {
  _toastService = inject(ToastNotifService);
}
