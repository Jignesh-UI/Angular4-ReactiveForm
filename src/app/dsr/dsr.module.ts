import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { DsrRouterModule } from './dsr-routing.module';

import { DsrComponent } from './dsr.component';
import { TeamComponent } from './team/team.component';
import { UserComponent } from './user/user.component';
import { PbiComponent } from './pbi/pbi.component';
import { IssueComponent } from './issue/issue.component';
import { TasksComponent } from './tasks/tasks.component';

@NgModule({
  imports: [
    DsrRouterModule,
    SharedModule
  ],
  declarations: [
    DsrComponent, TeamComponent, UserComponent,
    PbiComponent, IssueComponent, TasksComponent
  ],
  providers: [ ]
})
export class DsrModule { }
