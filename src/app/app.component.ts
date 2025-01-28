import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConnectNComponent } from './components/connect-n/connect-n.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ConnectNComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'connect-n';
}
