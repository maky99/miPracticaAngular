import { Routes } from '@angular/router';
import { ListComponent } from './component/list/list';
import { ContactComponent } from './component/contact/contact';

export const routes: Routes = [
    { path: 'list-person', component: ListComponent },
    { path: 'contact', component: ContactComponent },
];
