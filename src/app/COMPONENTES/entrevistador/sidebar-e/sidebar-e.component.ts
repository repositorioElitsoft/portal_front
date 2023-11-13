import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-e',
  templateUrl: './sidebar-e.component.html',
  styleUrls: ['./sidebar-e.component.css']
})
export class SidebarEComponent {

  cerrarSesion(): void {
    const confirmacion = window.confirm('¿Deseas cerrar la sesión?');

    if (confirmacion) {
      // Realiza las acciones para cerrar la sesión aquí
      // Por ejemplo, puedes eliminar la cookie de autenticación o realizar una solicitud HTTP al servidor para cerrar la sesión.

      // Ejemplo: Elimina una cookie llamada 'token'
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      // Redirige al usuario a la página de inicio de sesión
      window.location.href = '/iniciar-sesion';
    } else {
      console.log('Sesión no cerrada.');
    }
  }

}
