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
        path:'categories-details/:categoria', loadComponent:()=> import('./categories/categories-details/categories-details.component').then(c => c.CategoriesDetailsComponent)
    },
    {
        path:'recipies-details/:NomeCategoria', loadComponent:()=> import('./recipes-details/recipes-details.component').then(c => c.RecipesDetailsComponent)
    },
    {
        path: 'add-recipie', loadComponent:() => import('./add-recipie/add-recipie.component').then(c => c.AddRecipieComponent)
    },
    {
        path:'favi-component/:NomeCategoria', loadComponent:() => import('./fav-component/fav-component.component').then(c => c.FavComponentComponent)
    }
];
