import { Component } from '@angular/core';
import { Imageservices } from '../../Service/Image.Service';
import { LoginService } from '../../Service/Login.Service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Image } from '../../Models/ImageDTO';

@Component({
  selector: 'app-admin-image',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './admin-image.component.html',
  styleUrl: './admin-image.component.css'
})
export class AdminImageComponent {
  images: Image [] = []; // Danh sách ảnh sử dụng ImageDTO
  totalImages: number = 0; // Tổng số ảnh
  selectedFiles: File[] = []; // Mảng các file được chọn
  uploadMessage: string = ''; // Thông báo upload
  // Biến kiểm soát hiển thị phần tải lên ảnh
  showUploadImage = false;
  isMenu = true;
  openMenu(){
    this.isMenu = true;
  }
  closeMenu(){
    this.isMenu = false;
  }
  constructor(private imageService: Imageservices, private login: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loadImages();
  }
  page : number = 1
  loadImages(): void {
    this.imageService.GetAllImages(this.page).subscribe(data =>{
      this.images = data.Images;
      this.totalImages = data.TotalImage;
      console.log(data);
    });
  }

  // Khi người dùng chọn nhiều file
  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    this.selectedFiles = Array.from(files); // Chuyển FileList thành mảng File[]
    if (this.selectedFiles.length > 0) {
      this.uploadMessage = `Selected ${this.selectedFiles.length} file(s)`;
    } else {
      this.uploadMessage = 'No files selected';
    }
  }

  ShowUpload(){
    this.showUploadImage = true;
  }
  CloseUpload(){
    this.showUploadImage = false;
  }
  // Upload nhiều file khi nhấn nút
  uploadImages(): void {
    if (this.selectedFiles.length === 0) {
      this.uploadMessage = 'Please select at least one file!';
      return;
    }

    this.imageService.UploadImages(this.selectedFiles).subscribe({
      next: (responses: Image[]) => {
        this.uploadMessage = `${responses.length} image(s) uploaded successfully`;
        responses.forEach(response => {
          this.images.push({
            Id: response.Id,
            Name: response.Name,
            Link: response.Link
          });
        });
        this.totalImages = this.images.length; // Cập nhật tổng số ảnh
        this.selectedFiles = []; // Reset sau khi upload
      },
      error: (err) => {
        this.uploadMessage = 'Upload failed: ' + err.message;
        console.error('Upload error:', err);
      }
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
