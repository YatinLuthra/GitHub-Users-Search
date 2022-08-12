import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Repo } from './repo';
import { catchError } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private clientid = 'Iv1.070de8234793a8e4';
  private clientsecret = 'ac0a7ba8f9b7ed925d35bfd17c3ac4d32bdd5828';
  private users_url = "https://api.github.com/users";
  

  constructor(private http: HttpClient) {
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      return of(result as T);
    };
  }

  getUser(username: string): Observable<User> {
    const user_url = `${this.users_url}/${username}?client_id${this.clientid}&client_secret${this.clientsecret}`;
    return this.http.get<User>(user_url).pipe(
      catchError(this.handleError<User>(`getUser username=${username}`))
    )
  }
  getRepos(username: string): Observable<Repo[]> {
    const repos_url = `${this.users_url}/${username}/repos?client_id${this.clientid}&client_secret${this.clientsecret}`;
    return this.http.get<Repo[]>(repos_url).pipe(
      catchError(this.handleError<Repo[]>('getRepos', []))
    )
  }
}
