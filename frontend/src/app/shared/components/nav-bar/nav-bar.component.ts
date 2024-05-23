import { Component, Renderer2, OnInit } from '@angular/core';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  isSideMenuVisible = false;

  constructor(private renderer: Renderer2) { }

  toggleSideMenu() {
    this.isSideMenuVisible = !this.isSideMenuVisible;

    // Obtén el elemento de la clase side-menu y ajusta su estilo de visualización
    const sideMenu = document.querySelector('.side-menu');
    if (sideMenu) {
      if (this.isSideMenuVisible) {
        this.renderer.addClass(sideMenu, 'active');
      } else {
        this.renderer.removeClass(sideMenu, 'active');
      }
    }
  }
}
