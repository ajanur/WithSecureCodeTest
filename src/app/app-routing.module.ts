import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './src/todo-list/todo-list.component';
import { PageNotFoundComponent } from './src/page-not-found/page-not-found.component';

import { TestComponent } from './src/test/test.component';
import { ProductListComponent } from './src/product-list/product-list.component';

const routes: Routes = [
  { path: '',   redirectTo: '/product-list', pathMatch: 'full' },
  { path: 'todo', component: TodoListComponent },
  { path: 'test', component: TestComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
