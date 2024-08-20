import { Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

export const routes: Routes = [
    {
        path: '', component: WelcomePageComponent
    },
    {
        path: 'home', loadComponent:() => import('./home-component/home-component.component').then( c => c.HomeComponentComponent)
    },
    {
        path:'categories', loadComponent:() => import('./categories/categories.component').then(c => c.CategoriesComponent)
    },
    {
        path:'categories-details', loadComponent:()=> import('./categories/categories-details/categories-details.component').then(c => c.CategoriesDetailsComponent)
    },
    
];
