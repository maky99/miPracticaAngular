import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponet } from './component/navbar/navbar';
import { ListComponent } from './component/list/list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponet, ListComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('miPracticaAngular');
}
