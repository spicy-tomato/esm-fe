import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvigilatorAssignRoomComponent } from './assign-room.component';

const routes: Routes = [
  {
    path: '',
    component: InvigilatorAssignRoomComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignRoomRoutingModule {}
