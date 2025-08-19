import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  data = { value: 'Initial Value' };

  updateValue() {
    // This will not trigger change detection because OnPush only checks for reference changes
    this.data.value = 'Updated Value';
  }

  updateReference() {
    // This will trigger change detection because the reference of `data` changes
    this.data = { value: 'Updated Value with New Reference' };
  }
}


