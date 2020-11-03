import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TemplateModule } from '@rx-angular/template';

import { ROUTES } from './zone-flags.routes';
import { ZoneFlagsComponent } from './zone-flags/zone-flags.component';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer';
import { GoogleMapsModule } from '@angular/google-maps';
import { DragNDropComponent } from './drag-n-drop/drag-n-drop.component';

const DECLARATIONS = [
  ZoneFlagsComponent, DragNDropComponent
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    TemplateModule,
    VisualizerModule,
    GoogleMapsModule
  ],
  exports: [DECLARATIONS]
})
export class ZoneFlagsModule {
}