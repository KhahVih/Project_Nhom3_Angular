import { Component } from '@angular/core';
import { Role } from '../../Models/RoleDTO';
import { PermissionService } from '../../Service/Permission.Service';
import { LoginService } from '../../Service/Login.Service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Permission } from '../../Models/PermissionDTO'; // Đảm bảo nhập khẩu đúng
import { PermissionRole } from '../../Models/PermissionRoleDTO';
import { RoleService } from '../../Service/Role.Service';

@Component({
  selector: 'app-admin-permission',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './admin-permission.component.html',
  styleUrls: ['./admin-permission.component.css'] // Sửa `styleUrl` thành `styleUrls`
})
export class AdminPermissionComponent {
  permissions: Permission[] = [];
  roles: Role[] = [];
  selectedRoles: number[] = [];
  newPermission: Permission = { Id: 0, Name: '', PermissionRoles: [] };
  editPermission: Permission | null = null;
  showAddForm: boolean = false;

  isMenu = true;
  openMenu(){
    this.isMenu = true;
  }
  closeMenu(){
    this.isMenu = false;
  }

  constructor(
    private permissionService: PermissionService,
    private login: LoginService,
    private router: Router,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.loadPermissions();
    this.loadRoles();
  }

  loadPermissions(): void {
    this.permissionService.GetPermissions().subscribe((data) => {
      this.permissions = data;
      console.log(data);
    });
  }

  loadRoles(): void {
    this.roleService.GetRoles().subscribe((data) => {
      this.roles = data;
      console.log(data);
    });
  }

  toggleAddForm(): void {
    this.showAddForm = true;
  }

  closeAddForm(): void {
    this.resetForm();
    this.showAddForm = false;
  }

  toggleRoleSelection(roleId: number): void {
    if (this.selectedRoles.includes(roleId)) {
      this.selectedRoles = this.selectedRoles.filter((id) => id !== roleId);
    } else {
      this.selectedRoles.push(roleId);
    }
  }

  addPermission(): void {
    this.newPermission.PermissionRoles = this.selectedRoles.map((roleId) => ({
      PermissionId: 0,
      RoleId: roleId,
      RoleName: this.roles.find((r) => r.Id === roleId)?.Name || ''
    }));

    this.permissionService.CreatePermission(this.newPermission).subscribe(() => {
      this.loadPermissions();
      console.log(this.newPermission);
      this.closeAddForm();
    });
  }

  
  edit(permission: Permission): void {
    this.editPermission = { ...permission };
    this.selectedRoles = permission.PermissionRoles.map((pr) => pr.RoleId);
  }

  closedit(): void {
    this.editPermission = null;
    this.selectedRoles = [];
  }

  updatePermission(): void {
    if (this.editPermission) {
      this.editPermission.PermissionRoles = this.selectedRoles.map((roleId) => ({
        PermissionId: 0,
        RoleId: roleId,
        RoleName: this.roles.find((r) => r.Id === roleId)?.Name || ''
      }));

      this.permissionService.UpdatePermission(this.editPermission).subscribe(() => {
        this.loadPermissions();
        this.closedit();
      });
    }
  }

  deletePermission(id: number): void {
    if (confirm('Bạn có chắc muốn xóa?')) {
      this.permissionService.DeletePermission(id).subscribe(() => {
        this.loadPermissions();
      });
    }
  }

  resetForm(): void {
    this.newPermission = { Id: 0, Name: '', PermissionRoles: [] };
    this.editPermission = null;
    this.selectedRoles = [];
  }

  logout(){
    this.login.logout();
    this.router.navigate(['admin/login']);
  }

  get isAdmin(): boolean {
    return this.login.isAdmin();
  }
}