import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../Service/Login.Service';
import { ProductService } from '../../Service/Product.Service';
import { Product } from '../../Models/ProductDTO';
import { Image } from '../../Models/ImageDTO';
import { Category } from '../../Models/CategoryDTO';
import { ProductCategory } from '../../Models/ProductCategoryDTO';
import { Imageservices } from '../../Service/Image.Service';
import { Categoryservice } from '../../Service/Category.Service';
import { Sale } from '../../Models/SaleDTO';
import { SaleService } from '../../Service/Sale.Service';
import { Color } from '../../Models/ColorDTO';
import { Size } from '../../Models/SizeDTO';

@Component({
  selector: 'app-admin-product',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-product.component.html',
  styleUrl: './admin-product.component.css'
})
export class AdminProductComponent implements OnInit{
  isMenu = true;
  openMenu(){
    this.isMenu = true;
  }
  closeMenu(){
    this.isMenu = false;
  }
  products: Product[] = [];
  page: number = 1;
  totalPages: number = 0;
  allImages: Image[] = [];
  allCategories: Category[] = [];
  newProduct = { 
    Id: 0,
    PosCode: '', 
    Name: '', 
    Price: 0, 
    Description: '', 
    IsPublish: true, 
    IsNew: true, 
    Count: 0, 
    CreatedAt: new Date(),  
    UpdatedAt: new Date(),
    Images: [] as Image[],
    ProductCategorys: [] as ProductCategory[],
     // Sửa từ ProductCategorys thành ProductCategories
  };
  selectedFiles: { file: File, preview: string }[] = [];
  selectedImageIds: number [] = [];
  selectedImagePreviews: string[] = [];
  selectedCategoryId: number | null = null;
  isEditing: boolean = false; // Biến kiểm soát chế độ chỉnh sửa
  showAddForm: boolean = false; // Biến mới để kiểm soát hiển thị form
  totalProduct: number = 0;
  uploadMessage: string = 'No files selected';
  constructor(
    private login: LoginService, 
    private router: Router, 
    private productService: ProductService,
    private imageService: Imageservices,
    private categoryService: Categoryservice,
    private saleService: SaleService,
  ){}

  get isAdmin(): boolean{
    return this.login.isAdmin();
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadImages();
    this.loadCategories();
    this.loadSizes();
    this.loadColors();
    this.loadsale();
  }

  loadProducts(): void {
    this.productService.GetProducts(this.page).subscribe(data =>{
      this.products = data.Products;
      this.totalProduct = data.TotalProduct
      this.totalPages = data.TotalPages;
      this.updateVisiblePages();
      console.log('Response: ',data);
    })
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
      this.loadProducts();
      this.updateVisiblePages()
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadProducts();
      this.updateVisiblePages()
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadProducts();
      this.updateVisiblePages()
    }
  }

  loadImages(): void {
    this.imageService.GetAllImages(this.page).subscribe({
      next: (images: Image[]) => {
        this.allImages = images;
      },
      error: (error) => {
        console.error('Error fetching images:', error);
      }
    });
  }

  loadCategories(): void {
    this.categoryService.GetCategories().subscribe({
      next: (categories: Category[]) => {
        this.allCategories = categories;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }
  sales: Sale [] = [];
  loadsale(){
    this.saleService.GetSale().subscribe(data =>{
      this.sales = data;
      console.log('sale: ',data);
    });
  }
  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
      this.isEditing = false;
    } 
    else if(!this.editProduct){
      this.resetForm();
    }
  }
  closeAddForm(): void {
    this.resetForm()
    this.isEditing = false;
    this.showAddForm = false;
    this.loadProducts();
  }
  // Cập nhật onFileSelected
  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    this.selectedFiles = Array.from(files).map(file => ({
      file: file,
      preview: URL.createObjectURL(file) // Tạo URL một lần và lưu lại
    }));
    if (this.selectedFiles.length > 0) {
      this.uploadMessage = `Selected ${this.selectedFiles.length} file(s)`;
    } else {
      this.uploadMessage = 'No files selected';
    }
  }

  // Xóa ảnh
  removeImage(index: number): void {
    // Giải phóng blob URL khi xóa
    URL.revokeObjectURL(this.selectedFiles[index].preview);
    this.selectedFiles.splice(index, 1);
    this.uploadMessage = this.selectedFiles.length > 0 
      ? `Selected ${this.selectedFiles.length} file(s)` 
      : 'No files selected';
  }

  // Không cần getPreviewUrl nữa, nhưng nếu giữ lại thì chỉ trả về preview đã lưu
  getPreviewUrl(file: File): string {
    const selectedFile = this.selectedFiles.find(sf => sf.file === file);
    return selectedFile ? selectedFile.preview : '';
  }

  onImageSelect(imageId: number, event: any): void {
    var checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedImageIds.push(imageId);
    } else {
      this.selectedImageIds = this.selectedImageIds.filter(id => id !== imageId);
    } 
  }

  onCategorySelect(event: Event): void {
    const target = event.target as HTMLSelectElement; // Ép kiểu EventTarget thành HTMLSelectElement
    this.selectedCategoryId = target.value ? +target.value : null; // Chuyển string thành number
  }

  selectedColors: Color[] = []; // Array to hold selected colors
  selectedSizes: Size[] = []; // Array to hold selected sizes
  colors: Color[] = []; // Available colors from API
  sizes: Size[] = []; // Available sizes from API
  loadColors() {
    this.productService.getColor().subscribe(data => {
      this.colors = data;
      console.log("Colors:", data);
    });
  }

  loadSizes() {
    this.productService.getSize().subscribe(data => {
      this.sizes = data;
      console.log("Sizes:", data);
    });
  }
  toggleColorSelection(color: { Id: number, Name: string }): void {
    const index = this.selectedColors.findIndex(c => c.Id === color.Id);

    if (index === -1) {
      // Nếu màu chưa được chọn, thêm vào danh sách
      this.selectedColors.push(color);
    } else {
      // Nếu màu đã được chọn, bỏ chọn
      this.selectedColors.splice(index, 1);
    }
  }
  // Kiểm tra xem màu đã được chọn hay chưa
  isColorSelected(color: { Id: number, Name: string }): boolean {
    return this.selectedColors.some(c => c.Id === color.Id);
  }

  // Xóa màu đã chọn
  removeColor(colorId: number): void {
    this.selectedColors = this.selectedColors.filter(color => color.Id !== colorId);
  }
  

  // Toggle chọn/bỏ chọn kích thước
  toggleSizeSelection(size: { Id: number, Name: string }): void {
    const index = this.selectedSizes.findIndex(s => s.Id === size.Id);

    if (index === -1) {
      this.selectedSizes.push(size);
    } else {
      this.selectedSizes.splice(index, 1);
    }
  }

  // Kiểm tra size đã được chọn chưa
  isSizeSelected(size: { Id: number, Name: string }): boolean {
    return this.selectedSizes.some(s => s.Id === size.Id);
  }

  // Xóa size khỏi danh sách đã chọn
  removeSize(sizeId: number): void {
    this.selectedSizes = this.selectedSizes.filter(size => size.Id !== sizeId);
  }
  selectedSaleId: number | null = null;
  addProduct(): void {
    if (!this.newProduct.Name || this.newProduct.Price < 0) {
      this.uploadMessage = 'Please fill in required product fields!';
      return;
    }
    if (!this.selectedCategoryId || this.selectedColors.length === 0 || this.selectedSizes.length === 0) {
      this.uploadMessage = 'Please select a category, colors, and sizes!';
      return;
    }
    const selectedCategory = this.allCategories.find(c => c.Id === this.selectedCategoryId);
    const productDTO = {
      PosCode: this.newProduct.PosCode,
      Name: this.newProduct.Name,
      Price: this.newProduct.Price,
      Description: this.newProduct.Description || '',
      Count: this.newProduct.Count || 0,
      IsPublish: this.newProduct.IsPublish,
      IsNew: this.newProduct.IsNew,
      SaleId: this.selectedSaleId ? Number(this.selectedSaleId) : null,
      ProductCategorys: this.selectedCategoryId && selectedCategory
        ? [{
            ProductId: 0, // Placeholder, backend will set this
            ProductName: this.newProduct.Name, // Use product name
            CategoryId: this.selectedCategoryId,
            CategoryName: selectedCategory.Name
          }]
        : [],
      Colors: this.selectedColors.length > 0
        ? this.selectedColors.map(color => ({ Id: color.Id, Name: color.Name }))
        : [],
      Sizes: this.selectedSizes.length > 0
        ? this.selectedSizes.map(size => ({ Id: size.Id, Name: size.Name }))
        : [],
      Images: []
    };
    const formData = new FormData();
    formData.append('productDTOJson', JSON.stringify(productDTO));
    this.selectedFiles.forEach((sf) => {
      formData.append('imageFiles', sf.file);
    });

    this.productService.AddProduct(formData).subscribe({
      next: (product: Product) => {
        this.products.push(product);
        this.uploadMessage = 'Product and images uploaded successfully!';
        this.closeAddForm();
      },
      error: (error) => {
        this.uploadMessage = 'Error adding product: ' + error.message;
        console.error('Error adding product:', error);
      }
    });
  }
  editProduct(product: Product): void {
    this.isEditing = true;
    this.showAddForm = true;
    this.newProduct = {
       ...product, 
       Images: product.Images ? [...product.Images] : [], // Ensure Images is always an array
       ProductCategorys: [...(product.ProductCategorys || [])],
    };

    // Gán lại category (nếu có)
    if (product.ProductCategorys && product.ProductCategorys.length > 0) {
      this.selectedCategoryId = product.ProductCategorys[0].CategoryId;
    } else {
      this.selectedCategoryId = 0;
    }

    // Gán lại danh sách màu đã chọn
    this.selectedColors = product.Colors ?? [];

    // Gán lại danh sách kích thước đã chọn
    this.selectedSizes = product.Sizes ?? [];

    // Gán lại danh sách ID ảnh đã chọn (dùng để checked checkbox)
    this.selectedImageIds = product.Images?.map(img => img.Id) ?? [];

    // Gán lại SaleId
    this.selectedSaleId = product.SaleId || 0;  // Default to 0 if no SaleId is present

    // Log dữ liệu kiểm tra
    console.log('Product to edit:', product);
  }


  updateProduct(): void {
    if (!this.newProduct || !this.newProduct.Id) {
      this.uploadMessage = 'No product ID provided for update';
      console.error('No product ID provided for update');
      return;
    }
  
    const selectedCategory = this.allCategories.find(c => c.Id === this.selectedCategoryId);
    const oldImages = this.newProduct.Images || [];
    const newImages = this.selectedFiles.map(sf => ({
      Id: 0, // Or null if the new image does not have an ID
      Name: sf.file.name,
      Link: '', // Backend will handle this after uploading
    }));

    // Merge old and new images if any
    const mergedImages = [...oldImages, ...newImages];

    const productDTO = {
      Id: this.newProduct.Id,
      PosCode: this.newProduct.PosCode,
      Name: this.newProduct.Name,
      Price: this.newProduct.Price,
      Description: this.newProduct.Description || '',
      Count: this.newProduct.Count || 0,
      IsPublish: this.newProduct.IsPublish,
      IsNew: this.newProduct.IsNew,
      SaleId: this.selectedSaleId ? Number(this.selectedSaleId) : null,
      Images: this.newProduct.Images || [],
      ProductCategorys: this.selectedCategoryId && selectedCategory
        ? [{
            ProductId: this.newProduct.Id,
            ProductName: this.newProduct.Name,
            CategoryId: this.selectedCategoryId,
            CategoryName: selectedCategory.Name
          }]
        : [],
      Colors: this.selectedColors.map(color => ({ Id: color.Id, Name: color.Name })),
      Sizes: this.selectedSizes.map(size => ({ Id: size.Id, Name: size.Name })),
    };
  
    const formData = new FormData();
    formData.append('productDTOJson', JSON.stringify(productDTO));
  
    this.selectedFiles.forEach((sf) => {
      formData.append('imageFiles', sf.file);
    });
  
    this.productService.UpdateProduct(this.newProduct.Id, formData).subscribe({
      next: (updatedProduct: Product) => {
        this.products = this.products.map(p =>
          p.Id === updatedProduct.Id ? updatedProduct : p
        );
        this.uploadMessage = 'Product updated successfully!';
        this.closeAddForm();
      },
      error: (error) => {
        this.uploadMessage = 'Error updating product: ' + error.message;
        console.error('Error updating product:', error);
      }
    });
  }

  

  // Xóa sản phẩm
  deleteProduct(productId: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      this.productService.DeleteProduct(productId).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.Id !== productId);
          console.log(`Deleted product ID ${productId}`);
          if (this.isEditing && this.newProduct.Id === productId) {
            this.resetForm(); // Reset form nếu sản phẩm đang chỉnh sửa bị xóa
          }
          this.loadProducts();
        },
        error: (error) => {
          console.error('Error deleting product:', error);
        }
      });
    }
  }

  cancelEdit(): void {
    this.closeAddForm();
  }

  resetForm(): void {
    this.selectedFiles.forEach(sf => URL.revokeObjectURL(sf.preview)); // Giải phóng tất cả blob URLs
    this.newProduct = {
      Id: 0,
      PosCode: '',
      Name: '',
      Price: 0,
      Description: '',
      IsPublish: true,
      IsNew: true,
      Count: 0,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      Images: [],
      ProductCategorys: [],
    };
    this.selectedSaleId = null;
    this.selectedFiles = [];
    this.selectedImageIds = [];
    this.selectedCategoryId = null;
    this.selectedColors = [];
    this.selectedSizes = [];
    this.uploadMessage = 'No files selected';
  }

  getCategoryNames(product: Product): string {
    if (product?.ProductCategorys?.length > 0) {
      return product.ProductCategorys.map(cat => cat.CategoryName).join(', ');
    }
    return 'Không có danh mục';
  }
  logout(){
    this.login.logout();
    this.router.navigate(['admin/login']);
  }
}
