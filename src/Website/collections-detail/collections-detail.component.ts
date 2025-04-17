import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Collection {
  id: string;
  name: string;
  images: { src: string; alt: string }[];
}

@Component({
  selector: 'app-collections-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './collections-detail.component.html',
  styleUrls: ['./collections-detail.component.css']
})
export class CollectionsDetailComponent implements OnInit {
  @ViewChild('navbar', { static: false }) navbar!: ElementRef;
  email: string = 'Ducpham.ms@gmail.com';
  isSearchVisible: boolean = false;
  searchQuery: string = '';
  collection: Collection | null = null;

  // Dữ liệu mẫu cho các bộ sưu tập
  collections: Collection[] = [
    {
      id: 'mua-dong',
      name: 'VẦN ĐIỆU MÙA ĐÔNG',
      images: [
        { src: 'https://chamygaby.vn/thumbs/311x461x1/upload/product/20241228-135853-2451.jpg', alt: 'Mùa Đông 1' },
      ]
    },
    {
      id: 'da-tuyt',
      name: 'BST "DẠ TUYT"',
      images: [
        { src: 'https://chamygaby.vn/thumbs/311x461x1/upload/product/20241228-135425-1780.jpg', alt: 'Dạ Tuyt 1' },
      ]
    },
    {
      id: 'ao-dai',
      name: 'BỘ SƯU TẬP ÁO DÀI',
      images: [
        { src: 'https://chamygaby.vn/thumbs/311x461x1/upload/product/20241228-134715-5713.jpg', alt: 'Áo Dài 1' },
        { src: 'https://chamygaby.vn/upload/product/43-3037.png', alt: 'Áo Dài 2' },
        { src: 'https://chamygaby.vn/upload/product/22-1952.png', alt: 'Áo Dài 3' },
      ]
    },
    {
      id: 'gieo-huong',
      name: 'BST "GIEO HƯƠNG"',
      images: [
        { src: 'https://chamygaby.vn/thumbs/311x461x1/upload/product/20240814-162756-2274.jpg', alt: 'Gieo Hương 1' },
      ]
    }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Lấy id từ route params
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.collection = this.collections.find(col => col.id === id) || null;
    });
  }

  toggleMenu() {
    const navbarElement = this.navbar.nativeElement;
    navbarElement.classList.toggle('active');
  }

  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
    if (!this.isSearchVisible) {
      this.searchQuery = '';
    }
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
      this.searchQuery = '';
      this.toggleSearch();
    } else {
      alert('Vui lòng nhập từ khóa tìm kiếm!');
    }
  }

  onSearchChange() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
    }
  }
}