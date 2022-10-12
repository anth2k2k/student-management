import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentUpdateComponent } from './student-update/student-update.component';

const routes: Routes = [
  { path: '', component: StudentListComponent },
  { path: 'create-student/:id', component: StudentCreateComponent},
  { path: 'update-student/:id', component: StudentUpdateComponent},
  { path: 'students', component: StudentListComponent },
  { path: 'create-student', component: StudentCreateComponent},
  { path: 'update-student', component: StudentUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
