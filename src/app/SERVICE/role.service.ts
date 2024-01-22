import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../interface/role.interface';

@Injectable({
    providedIn: 'root'
})
export class RoleService {

    private baseUrl = 'http://localhost:8080/roles'; // Reemplaza con la URL de tu servidor Spring Boot

    constructor(private http: HttpClient) { }

    getAllRoles(): Observable<Role[]> {
        return this.http.get<Role[]>(`${this.baseUrl}/`);
    }

    getRoleById(id: number): Observable<Role> {
        return this.http.get<Role>(`${this.baseUrl}/${id}`);
    }

    getRoleByName(name: string): Observable<Role> {
        return this.http.get<Role>(`${this.baseUrl}/name/${name}`);
    }

    saveOrUpdateRole(role: Role): Observable<Role> {
        if (role.id === null || role.id === undefined) {
            return this.http.post<Role>(`${this.baseUrl}/`, role);
        } else {
            return this.http.put<Role>(`${this.baseUrl}/${role.id}`, role);
        }
    }


    deleteRole(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
