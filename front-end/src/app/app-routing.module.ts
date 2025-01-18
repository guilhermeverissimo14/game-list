import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { NgModule } from "@angular/core";
import { ListCardComponent } from "./pages/list-card/list-card.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list-card/:id', component: ListCardComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
