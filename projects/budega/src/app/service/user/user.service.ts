import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BudegaUser, ClientUser, Role } from '../../admin/user/models/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  api = environment.api;
  resource = 'users';

  constructor(private httpClient: HttpClient) {}

  getUserList(): Observable<BudegaUser[]> {
    return this.httpClient.get<BudegaUser[]>(
      `${this.api.url}/${this.resource}`,
      {
        reportProgress: true
      }
    );
  }

  addUserClient(client: ClientUser): Observable<void> {
    return this.httpClient.post<void>(
      `${this.api.url}/${this.resource}/client`,
      client,
      {
        reportProgress: true
      }
    );
  }

  getRoles(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(
      `${this.api.url}/${this.resource}/roles`,
      {
        reportProgress: true
      }
    );
  }

  getUserById(id: string): Observable<BudegaUser[]> {
    return this.httpClient.get<BudegaUser[]>(
      `${this.api.url}/${this.resource}/${id}`,
      {
        reportProgress: true
      }
    );
  }

  updateBudegaUserImage(budegaUser: any, image: any): Observable<void> {
    return this.httpClient.post<void>(
      `${this.api.url}/${this.resource}/image/${budegaUser.id}`,
      image,
      {
        reportProgress: true
      }
    );
  }
}
