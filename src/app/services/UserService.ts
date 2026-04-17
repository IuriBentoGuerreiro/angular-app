import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { UserRequest } from "../models/UserRequest";
import { UserResponse } from "../models/UserResponse";
import { FilterName } from "../models/FilterName";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    private apiUrl = 'http://localhost:8080/users'

    constructor(private http: HttpClient) { }

    findAll(): Observable<UserResponse[]> {
        return this.http.get<UserResponse[]>(this.apiUrl);
    }

 searchName(filterName: FilterName): Observable<UserResponse[]> {
    let params = new HttpParams();
    
    if (filterName?.name) {
        params = params.set('name', filterName.name);
    }

    return this.http.get<UserResponse[]>(`${this.apiUrl}/search`, { params });
}

    create(userRequest: UserRequest): Observable<UserResponse> {
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