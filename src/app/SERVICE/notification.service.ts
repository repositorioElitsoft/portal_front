import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  async showNotification(icon: SweetAlertIcon, title: string, text: string) {
    const result = await Swal.fire({
      icon,
      title,
      text,
      cancelButtonColor: '#515151',
      confirmButtonColor: '#F57C27',
      customClass: {
        popup: 'custom-border' // Aplica la clase al cuadro de diálogo
    }
    });

    return result.isConfirmed
  }
}
