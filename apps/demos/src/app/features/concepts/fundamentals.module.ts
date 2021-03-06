import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: 'nested-vs-injected',
    loadChildren: () => import('./nested-vs-injected/nested-vs-injected.module').then(
      m => m.NestedVsInjectedModule
    )
  },
  {
    path: 'passing-values',
    loadChildren: () => import('./passing-values/passing-values.module').then(
      m => m.PassingValuesModule
    )
  },
  {
    path: 'zone-patched-apis',
    loadChildren: () => import('./zone-patched-apis/zone-patched-apis.module').then(
      m => m.ZonePatchedApisModule
    )
  },
  {
    path: 'scheduling',
    loadChildren: () => import('./scheduling/scheduling.module').then(
      m => m.SchedulingModule
    )
  },
  {
    path: 'coalescing',
    loadChildren: () => import('./coalescing/coalescing.module').then(
      m => m.CoalescingModule
    )
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(ROUTES)
  ]
})
export class FundamentalsModule {
}
