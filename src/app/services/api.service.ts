import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
 private userChanged = new Subject<User[]>();
  private user:User[]=[];
  private baseUrl = 'http://localhost:3000/enquire';


  constructor(private http: HttpClient) {}

  postRegistration(registerObj: User) {
    return this.http.post<User>(`${this.baseUrl}`, registerObj);
  }

  getRegisteredUser() {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  updateRegisterUser(registerObj: User, id: number) {
    return this.http.put<User>(`${this.baseUrl}/${id}`, registerObj);
  }

  deleteRegistered(id:number) {
    return this.http.delete<User>(`${this.baseUrl}/${id}`);
    // console.log('before',this.user,id)
    // this.user.splice(id, 1);
    // this.userChanged.next(this.user.slice());

  }

  getRegisteredUserId(id: number) {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  // getSingleUserId(id: string) {
  //   return this.http.get<User>(`${this.baseUrl}/${id}`);
  // }
}
