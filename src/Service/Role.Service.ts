import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../Models/RoleDTO';

@Injectable({
    providedIn: 'root'
})
export class RoleService{
    private apirole = 'https://localhost:7194/api/Role';
    constructor(private http: HttpClient) {}
    // Get Role 
    GetRoles(): Observable<Role[]> {
        return this.http.get<Role[]>(this.apirole);
    }
    // Create Role 
    CreateRole(role: Role): Observable<Role> {
        return this.http.post<Role>(this.apirole, role);
    }
    // Update Role 
    UpdateRole(id: number, role: Role): Observable<void> {
        return this.http.put<void>(`${this.apirole}/${id}`, role);
    }
    // Delete Role 
    DeleteRole(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apirole}/${id}`);
    }
}
