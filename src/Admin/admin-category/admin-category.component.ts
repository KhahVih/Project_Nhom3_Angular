import { Component } from '@angular/core';
import { Categoryservice } from '../../Service/Category.Service';
import { LoginService } from '../../Service/Login.Service';
import { Router, RouterLink } from '@angular/router';
import { Category } from '../../Models/CategoryDTO';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-category',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './admin-category.component.html',
  styleUrl: './admin-category.component.css'
})
export class AdminCategoryComponent {
  category: Category [] = [];
  newCategory: Category  = {Id: 0, Name: ''};
  editCategoryId: number | null = null;
  editCategoryName: string = ''; // Lưu tên ban đầu để khôi phục nếu bấm "Hủy"
  constructor(private categorysrv: Categoryservice, private login: LoginService, private router: Router){}
  isMenu = true;
  openMenu(){
    this.isMenu = true;
  }
  closeMenu(){
    this.isMenu = false;
  }
  ngOnInit(): void {
    this.getCategory();
  }
  getCategory(){
    this.categorysrv.GetCategories().subscribe(data =>{
      this.category = data;
    });
  }

  addCategory(){
    if(!this.newCategory.Name.trim()) return;
    this.categorysrv.addCategory(this.newCategory).subscribe(data =>{
      this.category.push(data);
      console.log('add category: ', data);
      this.newCategory = { Id: 0, Name: '' }; // Reset input
      this.getCategory();
    });
  }
  startEditing(Id: number, Name: string) {
    this.editCategoryId = Id;
    this.editCategoryName = Name; // Lưu lại tên gốc để có thể hủy chỉnh sửa
  }

  updateCategory(Id: number, Name: string){
    const updateCategory: Category = {Id, Name};

    this.categorysrv.updateCategory(Id, updateCategory).subscribe(() =>{
      const index = this.category.findIndex(c => c.Id === Id);
      if(index !== -1){
        this.category[index] = updateCategory;
      }
      this.editCategoryId = null // Thoát chế độ chỉnh sửa
      console.log(`Update category Id ${Id}`);
      this.getCategory();
    });
  }
  cancelEdit() {
    this.editCategoryId = null;
  }

  deleteCategory(Id: number){
    this.categorysrv.deleteCategory(Id).subscribe(() =>{
      this.category = this.category.filter(c => c.Id === Id);
      console.log(`Delete category Id ${Id}`);
      this.getCategory();
    });
  }

  // 
  logout(){
    this.login.logout();
    this.router.navigate(['/login']);
  }
  get isAdmin(): boolean{
    return this.login.isAdmin();
  }

}
