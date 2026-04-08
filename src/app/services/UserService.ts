import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/User";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    private apiUrl = 'http://localhost:8080/users'

    constructor(private http: HttpClient) { }

    findAll(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }

    create(user: User): Observable<User> {
        return this.http.post<User>(this.apiUrl, user);
    }
}