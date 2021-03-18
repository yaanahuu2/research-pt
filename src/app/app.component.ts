import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'research-pt';

  otherTheme: boolean = false;

  changeTheme() {
    this.otherTheme = !this.otherTheme;
  }
}
