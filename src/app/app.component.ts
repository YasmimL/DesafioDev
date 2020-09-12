import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DesafioDev';
  highContrast: boolean = false;

  onChangeValue(event: any) {
    this.highContrast = event.newValue;
  }

}


