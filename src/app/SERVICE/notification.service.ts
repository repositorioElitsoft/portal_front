import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  showNotification(icon: SweetAlertIcon, title: string, text: string) {
    Swal.fire({
      icon,
      title,
      text,
    });
  }
}
