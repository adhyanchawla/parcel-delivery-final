import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationGuard } from './authentication.guard';
import { OrdersComponent } from './orders/orders.component';
import { TrackpackageComponent } from './trackpackage/trackpackage.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthenticationGuard] },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthenticationGuard],
  },
  { path: 'track-package/:orderId', component: TrackpackageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
