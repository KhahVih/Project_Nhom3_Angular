import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PermissionService } from '../../Service/Permission.Service';
import { LoginService } from '../../Service/Login.Service';
import { RoleService } from '../../Service/Role.Service';
import { Role } from '../../Models/RoleDTO';

@Component({
  selector: 'app-admin-role',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './admin-role.component.html',
  styleUrl: './admin-role.component.css'
})
export class AdminRoleComponent {
  roles: Role[] = [];
  newRole: Role = { Id: 0, Name: '' };
  editMode: boolean = false;
  editRole: Role = { Id: 0, Name: '' };
  showAddForm: boolean = false;
  isEditing: boolean = false;
  isMenu = true;
  openMenu() {
    this.isMenu = true;
  }
  closeMenu() {
    this.isMenu = false;
  }
  constructor(private roleService: PermissionService, private login: LoginService,private RoleService: RoleService , private router: Router) { }

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.RoleService.GetRoles().subscribe((data) => {
      this.roles = data;
    });
  }
  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    } else {
      this.isEditing = false;
      this.newRole = { Id: 0, Name: '' };
    }
  }
  addRole(): void {

    this.RoleService.CreateRole(this.newRole).subscribe((createdRole) => {
      this.roles.push(createdRole);
      this.loadRoles();
      this.resetForm();
    });
  }

  edit(role: Role): void {
    this.isEditing = true;
    this.showAddForm = true;
    this.editRole = { ...role };

  }

  updateRole(): void {
    if (!this.editRole.Name.trim()) {
      alert('Tên vai trò không được để trống!');
      return;
    }

    this.RoleService.UpdateRole(this.editRole.Id!, this.editRole).subscribe(() => {
      this.roles = this.roles.map((r) => (r.Id === this.editRole.Id ? this.editRole : r));
      this.loadRoles();
      this.resetForm();
    });
  }

  deleteRole(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa vai trò này?')) {
      this.RoleService.DeleteRole(id).subscribe(() => {
        this.roles = this.roles.filter((r) => r.Id !== id);
      });
      this.loadRoles();
    }
  }

  resetForm() {
    this.showAddForm = false;
    this.isEditing = false;
    this.newRole = { Id: 0, Name: '' };
    this.editRole = { Id: 0, Name: '' };
  }

  //
  logout(){
    this.login.logout();
    this.router.navigate(['admin/login']);
  }
  get isAdmin(): boolean {
    return this.login.isAdmin();
  }

}
