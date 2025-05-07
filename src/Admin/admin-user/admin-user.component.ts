import { Component } from '@angular/core';
import { UserService } from '../../Service/User.Service';
import { PermissionService } from '../../Service/Permission.Service';
import { LoginService } from '../../Service/Login.Service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../Models/UserDTO';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Permission } from '../../Models/PermissionDTO';

@Component({
  selector: 'app-admin-user',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.css'
})
export class AdminUserComponent {
  users: User[] = [];
  permissions: Permission [] = [];
  selectpermissions: number[] = [];
  //selectedPermissionId: number | null = null;
  newUser: User = {
    Id: 0,
    UserName: '',
    FullName: '',
    Email: '',
    Password: '',
    IsAdmin: false,
    UserPermissions: []
  };
  editUser: any = null;
  isAddUserModalOpen = false;
  isEditUserModalOpen = false;
  isMenu = true;
  openMenu() {
    this.isMenu = true;
  }
  closeMenu() {
    this.isMenu = false;
  }
  constructor(
    private userService: UserService,
    private permissionssrv: PermissionService,
    private login: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getPermissions();

  }
  getUser() {
    this.userService.GetUsers().subscribe(users => {
      this.users = users;
      console.log(users);
    });
  }
  onPermissionSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedOptions = Array.from(selectElement.selectedOptions).map(option => +option.value); // Chuyển thành number
    this.selectpermissions = selectedOptions;
    console.log('Selected Permission ID:', this.selectpermissions);
    // Logic xử lý khi chọn quyền, ví dụ: gọi API hoặc cập nhật dữ liệu
  }
  getPermissions() {
    this.permissionssrv.GetPermissions().subscribe(permissions => {
      this.permissions = permissions;
    });
  }

  openAddUserModal() {
    this.isAddUserModalOpen = true;
  }

  closeAddUserModal() {
    this.isAddUserModalOpen = false;
    this.resetForm();
  }


  addUser(): void {
    this.newUser.UserPermissions = this.selectpermissions.map((permissionId) => ({
      UserId: 0,
      PermissionId: permissionId,
      PermissionName: this.permissions.find((p) => p.Id === permissionId)?.Name || '',
    }));

    this.userService.CreateUser(this.newUser).subscribe(() => {
      console.log(this.newUser);
      this.getUser();
      this.closeAddUserModal();
    });
  }

  edit(user: User): void {
    this.editUser = { ...user };
    this.selectpermissions = user.UserPermissions.map((up) => up.PermissionId)
  }
  // Mở modal chỉnh sửa với dữ liệu người dùng
  openEditUserModal(user: any) {
    this.editUser = { ...user }; // Sao chép dữ liệu người dùng để chỉnh sửa
    this.selectpermissions = user.UserPermissions.map((up: { PermissionId: any; }) => up.PermissionId) // Giả sử user có thuộc tính Permissions
    this.isEditUserModalOpen = true;
  }

  // Đóng modal chỉnh sửa
  closeEditUserModal() {
    this.isEditUserModalOpen = false;
    this.editUser = null;
    this.selectpermissions = [];
  }
  updateUser(): void {
    if (this.editUser) {
      this.editUser.UserPermissions = this.selectpermissions.map((permissionId) => ({
        UserId: 0,
        PermissionId: permissionId,
        PermissionName: this.permissions.find((p) => p.Id === permissionId)?.Name || '',
      }));

      this.userService.UpdateUser(this.editUser).subscribe(() => {
        this.getUser();
        this.closeEditUserModal();
      });
    }
  }
  deleteUser(id: number): void {
    this.userService.DeleteUser(id).subscribe(() => {
      console.log('User deleted');
      this.users = this.users.filter(user => user.Id !== id);
    });
  }

  resetForm() {
    this.newUser = {
      Id: 0,
      UserName: '',
      FullName: '',
      Email: '',
      Password: '',
      IsAdmin: false,
      UserPermissions: []
    };
    this.selectpermissions = [];
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
