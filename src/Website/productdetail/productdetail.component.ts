import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../Service/Product.Service';
import { Product } from '../../Models/ProductDTO';
import { Image } from '../../Models/ImageDTO';
import { Color } from '../../Models/ColorDTO';
import { Size } from '../../Models/SizeDTO';
import { CustomerService } from '../../Service/Customer.Service';
import { CartItem } from '../../Models/CartDTO';
import { CartService } from '../../Service/Cart.Service';
import { buffer } from 'stream/consumers';

@Component({
  selector: 'app-productdetail',
  imports: [CommonModule, RouterLink],
  templateUrl: './productdetail.component.html',
  styleUrl: './productdetail.component.css'
})
export class ProductdetailComponent implements OnInit{
  @ViewChild('navbar', {static: false}) navbar!: ElementRef;
  email: string = 'Ducpham.ms@gmail.com';
  constructor(
    private productService: ProductService, 
    private router: ActivatedRoute, 
    private customerService: CustomerService,
    private cartService: CartService,
  ){}
  @Input() product: Product | undefined;
  selectedImage: string = ''; // Biến lưu URL của ảnh chính
  colors: Color [] = []; // color
  sizes: Size [] = []; // size
  selectcolor: number | null = null; // Lưu ID màu được chọn
  selectsize: number | null = null;  // Lưu ID kích thước được chọn
  quantity: number = 1; // Giá trị mặc định
  availableQuantity: number = 0; // Số lượng còn lại trong kho
  activeTab: string = 'comments';
  relatedProducts: Product [] = []; // Danh sách sản phẩm cùng loại
  // Biến cho form bình luận
  newCommentVote: number = 0; // Điểm đánh giá (sao)
  newCommentText: string = ''; // Nội dung bình luận
  submitting: boolean = false; // Trạng thái gửi

  ngOnInit(): void {
    this.loadProduct();
    this.loadColor();
    this.loadSize();
    // Gán availableQuantity từ product.Count
    if (this.product && this.product.Count >= 0) {
      this.availableQuantity = this.product.Count;
    } else {
      this.availableQuantity = 0; // Mặc định là 0 nếu không có dữ liệu
    }

    // Điều chỉnh quantity nếu cần
    if (this.availableQuantity < this.quantity) {
      this.quantity = this.availableQuantity; // Đảm bảo quantity không vượt quá kho
    }
  }
  // loadProduct
  loadProduct(){
    const ProductId = Number(this.router.snapshot.paramMap.get('id'));
    this.productService.GetProductId(ProductId).subscribe(data =>{
      this.product = data;
      this.categoryId = this.product?.ProductCategorys[0].CategoryId || 0// Lấy category đầu tiên
      this.availableQuantity = this.product?.Count || 0
      this.selectedImage = this.product?.Images[0].Link || ''; // Gán ảnh mặc định là ảnh đầu tiên trong danh sách khi component khởi tạo
      console.log('Product: ',data);
      this.loadRelatedProducts();
    });
  }
  //load color
  loadColor(){
    this.productService.getColor().subscribe(data =>{
      this.colors = data;
      //this.selectedColor = this.colors[0]?.Name || '';
      console.log('Color: ',data);
    });
  }
  // load size
  loadSize(){
    this.productService.getSize().subscribe(data =>{
      this.sizes = data;
      //this.selectedSize = this.sizes[0]?.Name || '';
      console.log('Size: ',data)
    });
  }
  // Add To Cart
  AddToCart(product: Product){
    if (this.selectcolor === null || this.selectsize === null) {
      alert('Vui lòng chọn màu và kích thước!');
      return;
    }
    // Lấy thông tin user từ authService
    const CustomerId = this.customerService.getCustomerId(); // Giả sử trả về { id: number } hoặc null nếu chưa đăng nhập
    // Lấy ColorId và SizeId từ lựa chọn của người dùng
    // const selectedColorId = this.selectcolor.length > 0 ? this.selectcolor[0] : 0; // Lấy màu đầu tiên nếu có
    // const selectedSizeId = this.selectsize.length > 0 ? this.selectsize[0] : 0;     // Lấy kích thước đầu tiên nếu có
    const cartItem: CartItem = {
      Id: 0,
      CustomerId: CustomerId ? +CustomerId: null, // Nếu chưa đăng nhập thì dùng ID = 0
      ProductId: product.Id,
      ProductName: product.Name,
      Quantity: this.quantity,
      ColorId: this.selectcolor || 0,
      ColorName: this.colors.find(c => c.Id === this.selectcolor)?.Name || '', // Lấy từ danh sách colors
      SizeId: this.selectsize || 0,
      SizeName: this.sizes.find(s => s.Id === this.selectsize)?.Name || '', // Lấy từ danh sách sizes
      UnitPrice: product.Price || 0,
      FinalPrice: 0, // Có thể tính lại dựa trên Sale từ backend
    };
    if (CustomerId) {
      // Nếu đã đăng nhập, gọi API để thêm vào giỏ hàng
      this.cartService.addToCart(cartItem).subscribe({
        next: () => {
          alert('Sản phẩm đã được thêm vào giỏ hàng!');
          console.log('Cart: ',cartItem);
          // this.loadCartItems(); // Cập nhật lại giỏ hàng từ API
        },
        error: (err) => {
          console.error('Error adding to cart:', err);
          alert('Có lỗi xảy ra khi thêm vào giỏ hàng!');
        }
      });
    } else {
      // Nếu chưa đăng nhập, lưu vào localStorage
      let cart = this.cartService.getCartFromLocal();
      const existingItem = cart.find(item =>
        item.ProductId === cartItem.ProductId &&
        item.ColorId === cartItem.ColorId &&
        item.SizeId === cartItem.SizeId
      );
      if (existingItem) {
        existingItem.Quantity += cartItem.Quantity;
      } else {
        cart.push(cartItem);
      }
      this.cartService.saveCartToLocal(cart);
      // this.loadCartItems(); // Cập nhật giao diện
      alert('Sản phẩm đã được thêm vào giỏ hàng !');
      console.log('Cart: ',cart);
    }
  }

  toggleMenu() {
    const navbarElement = this.navbar.nativeElement;
    navbarElement.classList.toggle('active');
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
  // Khi click vào thumbnail, thay đổi ảnh chính
  selectImage(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }
  // Hàm chọn màu
  selectColor(color: any) {
    this.selectcolor = color.Id;
    console.log(color);
    console.log('Selected Color ID:', this.selectcolor);
  }

  // Hàm chọn size
  selectSize(size: any) {
    this.selectsize = size.Id;
    console.log(size);
    console.log('Selected Size ID:', this.selectsize);
  }

  // Khi hover vào thumbnail, tạm thời thay đổi ảnh chính (tùy chọn)
  previewImage(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }
  // Giảm số lượng
  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // Tăng số lượng
  increaseQuantity(): void {
    if (this.quantity < this.availableQuantity) {
      this.quantity++;
    }
  }
  // Hàm tạo mảng sao (1-5)
  getStars(vote: number): number[] {
    return Array(5).fill(0).map((_, i) => i + 1);
  }
  // Chọn số sao cho bình luận mới
  setVote(star: number): void {
    this.newCommentVote = star;
  }
  // Gửi bình luận
  submitComment(): void {
    if (!this.newCommentText.trim() || this.newCommentVote < 1) {
      alert('Vui lòng nhập nội dung và chọn đánh giá!');
      return;
    }

    this.submitting = true;
    const newComment = {
      Vote: this.newCommentVote,
      Description: this.newCommentText,
      CreatedAt: new Date().toISOString(), // Giả lập ngày tạo
      ProductId: this.product?.Id // Giả lập ID sản phẩm
    };
    // Nếu dùng API thực tế, thay bằng:
    /*
    this.productService.addComment(newComment).subscribe(
      (response) => {
        this.product.Comments.push(response);
        this.newCommentText = '';
        this.newCommentVote = 0;
        this.submitting = false;
      },
      (error) => {
        console.error('Lỗi khi gửi bình luận:', error);
        this.submitting = false;
      }
    );
    */
  }
  // load sản phẩm cùng loại 
  page: number = 1
  categoryId: number = 0;
  loadRelatedProducts() {
    if (this.product && this.product.ProductCategorys?.length > 0) {
      console.log(this.categoryId);
      this.productService.GetProductCategoryId(this.categoryId, this.page).subscribe(data =>{
        this.relatedProducts = data.Products;
        console.log(data);
      });
    }
  }
}
