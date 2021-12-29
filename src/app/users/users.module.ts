import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../app-material.module';
import { UsersComponent } from './users/users.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    UsersComponent,
    EditProfileComponent,
    ProfileComponent
  ],
  imports: [CommonModule, AppMaterialModule],
})
export class UsersModule {}