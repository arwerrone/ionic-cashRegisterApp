import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'manager',
    children:[{
      path:'',
      loadChildren: () => import('./manager/manager.module').then( m => m.ManagerPageModule)
    },{
      path:'addproduct',
      loadChildren: () => import('./manager/add-product/add-product.module').then( m => m.AddProductPageModule)
    },{
      path:'history',
      children:[{
        path:'',
        loadChildren: () => import('./manager/history/history.module').then( m => m.HistoryPageModule)
      },{
        path:':history_id',
        loadChildren: () => import('./manager/history/details/details.module').then( m => m.DetailsPageModule)
      }]

    },{
      path:'restoke',
      loadChildren: () => import('./manager/restoke/restoke.module').then( m => m.RestokePageModule)
    }]

  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
