import { PermissionRole } from "./PermissionRoleDTO";

export interface Permission {
    Id: number;
    Name: string;
    PermissionRoles: PermissionRole [];
}