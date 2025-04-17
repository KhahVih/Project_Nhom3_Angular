import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Imageservices } from '../../Service/Image.Service';
import { LoginService } from '../../Service/Login.Service';
import { Image } from '../../Models/ImageDTO';

@Component({
  selector: 'app-admin-image',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './admin-image.component.html',
  styleUrl: './admin-image.component.css'
})
export class AdminImageComponent {
  images: Image[] = [];                 // Danh sách ảnh
  totalImages: number = 0;             // Tổng số ảnh
  selectedFiles: File[] = [];          // Mảng các file được chọn
  uploadMessage: string = '';          // Thông báo upload

  showUploadImage: boolean = false;    // Hiển thị giao diện tải ảnh
  isMenu: boolean = true;              // Trạng thái menu

  page: number = 1;                    // Trang hiện tại
  totalPages: number = 1;             // Tổng số trang

  constructor(
    private imageService: Imageservices,
    private login: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadImages();
  }

  openMenu(): void {
    this.isMenu = true;
  }

  closeMenu(): void {
    this.isMenu = false;
  }

  loadImages(): void {
    this.imageService.GetAllImages(this.page).subscribe(data => {
      this.images = data.Images;
      this.totalImages = data.TotalImage;
      this.totalPages = data.TotalPages;
      this.updateVisiblePages();
      console.log('Response:', data);
    });
  }

  visiblePages: number[] = [];
  updateVisiblePages(): void {
    const maxVisible = 5; // Số trang hiển thị tối đa
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, this.page - half);
    let end = Math.min(this.totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    this.visiblePages = [];
    for (let i = start; i <= end; i++) {
      this.visiblePages.push(i);
    }
  }
  // Phân trang
  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.page = pageNumber;
      this.loadImages();
      this.updateVisiblePages()
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadImages();
      this.updateVisiblePages()
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadImages();
      this.updateVisiblePages()
    }
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    this.selectedFiles = Array.from(files);

    this.uploadMessage = this.selectedFiles.length > 0
      ? `Selected ${this.selectedFiles.length} file(s)`
      : 'No files selected';
  }

  ShowUpload(): void {
    this.showUploadImage = true;
  }

  CloseUpload(): void {
    this.showUploadImage = false;
  }

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

        this.totalImages = this.images.length;
        this.selectedFiles = [];
      },
      error: (err) => {
        this.uploadMessage = 'Upload failed: ' + err.message;
        console.error('Upload error:', err);
      }
    });
  }

  logout(): void {
    this.login.logout();
    this.router.navigate(['admin/login']);
  }

  get isAdmin(): boolean {
    return this.login.isAdmin();
  }
}
