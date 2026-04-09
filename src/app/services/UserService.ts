import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { UserRequest } from "../models/UserRequest";
import { UserResponse } from "../models/UserResponse";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    private apiUrl = 'http://localhost:8080/users'

    constructor(private http: HttpClient) { }

    findAll(): Observable<UserResponse[]> {
        return this.http.get<UserResponse[]>(this.apiUrl);
    }

    create(userRequest: UserRequest): Observable<UserResponse>{
        return this.http.post<UserResponse>(this.apiUrl, userRequest);
    }

    findById(id: number): Observable<UserResponse> {
        return this.http.get<UserResponse>(`${this.apiUrl}/manager/${id}`);
    }

    update(id: number, userRequest: UserRequest): Observable<UserResponse> {
        return this.http.put<UserResponse>(`${this.apiUrl}/${id}`, userRequest);
    }

    deleteById(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`)
    }
}