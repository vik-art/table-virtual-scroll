import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  public getUsers(): Observable<any> {
    return this.http.get(`${environment.userApiUrl}/users/random_user`, {
      params: {
      size: 100
    }})
  }
}
