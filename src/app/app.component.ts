import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FourInARowComponent } from './components/connect-n/connect-n.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FourInARowComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'n-in-a-row';
}
