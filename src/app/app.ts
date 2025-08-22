import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponet } from './component/navbar/navbar';
import { ListComponent } from './component/list/list';
import { ListPlayerComponent } from './component/list-player/list-player';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponet, ListComponent, ListPlayerComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('miPracticaAngular');
}
