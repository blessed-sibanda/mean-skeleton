import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { User, IUser, ISignUp } from './user';
import { environment } from '../../environments/environment';
import { transformError } from '../common/common';

interface IUserService {
  signUp(userData: ISignUp): Observable<User>;
}

@Injectable({
  providedIn: 'root',
})
export class UserService implements IUserService {
  constructor(private httpClient: HttpClient) {}

  signUp(userData: ISignUp): Observable<User> {
    return this.httpClient
      .post<IUser>(`${environment.baseApiUrl}/users`, userData)
      .pipe(map(User.Build), catchError(transformError));
  }
}
