import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  loading: boolean = true;
  subs = new SubSink();

  constructor(private userService: UserService) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.subs.sink = this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
    });
  }
}
