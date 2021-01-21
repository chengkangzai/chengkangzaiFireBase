import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgrokPage } from './ngrok.component';

const routes: Routes = [
  {
    path: '',
    component: NgrokPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
