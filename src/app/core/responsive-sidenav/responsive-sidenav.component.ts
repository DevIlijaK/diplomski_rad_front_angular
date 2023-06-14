import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {logout} from "../../auth/store/actions";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-responsive-sidenav',
  templateUrl: './responsive-sidenav.component.html',
  styleUrls: ['./responsive-sidenav.component.scss']
})
export class ResponsiveSidenavComponent implements OnInit, AfterViewInit {

  navItems = [
    {label: 'Home', route: '/home', icon: 'home'},
    {label: 'About', route: '/about', icon: 'info'},
    // Add additional random elements here
  ];
  isSmallScreen = false;

  constructor(private store$: Store,
              private cdr: ChangeDetectorRef,
              private breakpointObserver: BreakpointObserver) {
    this.generateRandomElements(2);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
        console.log(this.isSmallScreen);
      });
    this.cdr.detectChanges();
  }

  generateRandomElements(count: number) {
    const icons = ['dashboard', 'settings', 'account_circle', 'notifications', 'menu'];
    const labels = ['Dashboard', 'Settings', 'Profile', 'Notifications', 'Menu'];

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * icons.length);
      const randomIcon = icons[randomIndex];
      const randomLabel = labels[randomIndex];

      this.navItems.push({label: randomLabel, route: `/${randomLabel.toLowerCase()}`, icon: randomIcon});
    }
  }

  logout() {
    this.store$.dispatch(logout());
  }

}
