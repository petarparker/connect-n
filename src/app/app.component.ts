import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FourInARowComponent } from './pages/four-in-a-row/four-in-a-row.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FourInARowComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'n-in-a-row';
}
