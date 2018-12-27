import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TeamComponent } from './team/team.component';
import { DsrComponent } from './dsr.component';
import { UserComponent } from './user/user.component';
import { PbiComponent } from './pbi/pbi.component';
import { IssueComponent } from './issue/issue.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  { path: '', component: DsrComponent },
  { path: 'team', component: TeamComponent },
  { path: 'team/:id&:status', component: TeamComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/:id&:status', component: UserComponent },
  { path: 'pbi', component: PbiComponent },
  { path: 'pbi/:id&:status', component: PbiComponent },
  { path: 'issue', component: IssueComponent },
  { path: 'issue/:id&:status', component: IssueComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'tasks/:id&:status', component: TasksComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DsrRouterModule {}
