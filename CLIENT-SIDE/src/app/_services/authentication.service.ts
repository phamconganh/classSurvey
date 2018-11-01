import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../app.config';

@Injectable()
export class AuthenticationService {
    constructor(private httpClient: HttpClient) { }

    login(username: string, password: string) {
        return this.httpClient.post<any>(
            appConfig.apiUrl + '/users/authenticate', 
            { username: username, password: password }
        )
        .subscribe(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
            return user;
        });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}