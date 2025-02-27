import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [RouterModule], // Add RouterModule here
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  // Debugging method
  onTabClick(route: string) {
    console.log(`Tab clicked: ${route}`);
  }
}

// importing the RouterModule in tabs.components.ts was what was needed to properly route the tabs