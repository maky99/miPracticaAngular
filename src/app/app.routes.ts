import { Routes } from '@angular/router';
import { ListComponent } from './component/list/list';
import { ContactComponent } from './component/contact/contact';
import { ListPlayerComponent } from './component/list-player/list-player';

export const routes: Routes = [
    { path: 'list-person', component: ListComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'list-player', component: ListPlayerComponent }
];
