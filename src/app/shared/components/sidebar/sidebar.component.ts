import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  activeSection: 'home' | 'archive' | 'settings' = 'home';

  constructor(
    private router: Router,
    private auth_service: AuthService)
    {}

  get user(){
    return this.auth_service.user;
  }

  setActiveSection(section: 'home' | 'archive' | 'settings') {
    this.activeSection = section;
  }

  toggleProfileMenu(){
    const subMenu = document.getElementById("subMenu");
    subMenu?.classList.toggle("open-menu");
  }

  logoutHandler(){
    this.auth_service.logOut();
    this.router.navigate(['/restaurant-list'])
  }

  loginHandler(){
    this.router.navigate(['/login']);
  }

  registerHandler(){
    this.router.navigate(['/register']);
  }
}
