import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { User, IUser, ISignUp } from './user';
import { environment } from '../../environments/environment';
import { transformError } from '../common/common';

interface IUserService {
  signUp(userData: ISignUp): Observable<User>;
  getUsers(): Observable<User[]>;
}

@Injectable({
  providedIn: 'root',
})
export class UserService implements IUserService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient
      .get<IUser[]>(`${environment.baseApiUrl}/users`)
      .pipe(map(User.BuildMany), catchError(transformError));
  }

  signUp(userData: ISignUp): Observable<User> {
    return this.httpClient
      .post<IUser>(`${environment.baseApiUrl}/users`, userData)
      .pipe(map(User.Build), catchError(transformError));
  }
}
