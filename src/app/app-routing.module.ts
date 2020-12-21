import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from './app.token';
import { ComplexAnimationComponent } from './pages/complex-animation/complex-animation.component';
import { ControlAnimationComponent } from './pages/control-animation/control-animation.component';
import { KeyframesAnimationComponent } from './pages/keyframes-animation/keyframes-animation.component';
import { StaggerAnimationComponent } from './pages/stagger-animation/stagger-animation.component';


const routes: Routes = [
  { path: '', component: ComplexAnimationComponent, data: { path: '/', label: 'Complex Animation' } },
  { path: 'stagger', component: StaggerAnimationComponent, data: { path: '/stagger', label: 'Stagger Animation' } },
  { path: 'keyframes', component: KeyframesAnimationComponent, data: { path: '/keyframes', label: 'Keyframes Animation' } },
  { path: 'control', component: ControlAnimationComponent, data: { path: '/control', label: 'Control Animation' } },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [
    { provide: APP_ROUTES, useValue: routes }
  ]
})
export class AppRoutingModule { }
