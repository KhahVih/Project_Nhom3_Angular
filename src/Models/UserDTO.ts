import { UserPermissions } from "./UserPermissionDTO";

export interface User {
    Id: number;
    UserName: string;
    FullName: string;
    Password: string;
    Email: string;
    IsAdmin: boolean;
    UserPermissions: UserPermissions [];
}