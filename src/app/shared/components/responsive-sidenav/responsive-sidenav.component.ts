import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-responsive-sidenav',
  templateUrl: './responsive-sidenav.component.html',
  styleUrls: ['./responsive-sidenav.component.scss']
})
export class ResponsiveSidenavComponent implements OnInit {

  navItems = [
    { label: 'Home', route: '/home', icon: 'home' },
    { label: 'About', route: '/about', icon: 'info' },
    // Add additional random elements here
  ];

  constructor() {
    this.generateRandomElements(2);
  }
  ngOnInit(): void {
  }
  generateRandomElements(count: number) {
    const icons = ['dashboard', 'settings', 'account_circle', 'notifications', 'menu'];
    const labels = ['Dashboard', 'Settings', 'Profile', 'Notifications', 'Menu'];

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * icons.length);
      const randomIcon = icons[randomIndex];
      const randomLabel = labels[randomIndex];

      this.navItems.push({ label: randomLabel, route: `/${randomLabel.toLowerCase()}`, icon: randomIcon });
    }
  }
}
