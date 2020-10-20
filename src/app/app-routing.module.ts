import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { SecureInnerPagesGuard } from './guard/secure-inner-pages.guard';


const routes: Routes = [

    // {path: 'registration', redirectTo: '/registration/signup', pathMatch: 'full'},
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: '',
        loadChildren: () => import('./loggedin-layout/loggedin-layout.module').then(m => m.LoggedinLayoutModule), canActivate: [AuthGuard]
    },

    {
        path: '',
        // tslint:disable-next-line: max-line-length
        loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule),
        canActivate: [
            SecureInnerPagesGuard
        ]
    },
    {
        path: 'pagenotfound',
        loadChildren: () => import('./page404/page404.module').then(m => m.Page404Module)
    },
    {
        path: '**',
        redirectTo: '/pagenotfound',
        pathMatch: 'full'
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
