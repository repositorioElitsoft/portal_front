import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../interface/role.interface';

@Injectable({
    providedIn: 'root'
})
export class RoleService {

    private baseUrl = 'http://localhost:8080/roles';

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

    getRolesByUserId(userId: number): Observable<Role[]> {
        return this.http.get<Role[]>(`${this.baseUrl}/${userId}/roles`);
    }


    saveOrUpdateRole(role: any, userId: number): Observable<any> {
        const url = `${this.baseUrl}/?userId=${userId}`;
        return this.http.post(url, role);
    }


    deleteRole(userId: number, roleId: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${userId}/${roleId}`);
    }

}
