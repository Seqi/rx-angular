import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { UnpatchEventsModule } from '@rx-angular/template';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks';
import { PushModule } from '../../../../shared/rx-angular-pocs/push/push.module';
import { PushPocComponent } from './push-poc.component';
import { ROUTES } from './push-poc.routes';

const DECLARATIONS = [PushPocComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    PushModule,
    DirtyChecksModule,
    MatButtonModule,
    UnpatchEventsModule
  ],
  exports: [DECLARATIONS]
})
export class PushPocModule {
}
