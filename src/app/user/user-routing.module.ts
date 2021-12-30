import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { UserResolve } from './user.resolve';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: ':userId',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    resolve: { user: UserResolve },
  },
  {
    path: ':userId/edit',
    component: EditProfileComponent,
    canActivate: [AuthGuard],
    data: { onlyOwner: true },
    resolve: { user: UserResolve },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
