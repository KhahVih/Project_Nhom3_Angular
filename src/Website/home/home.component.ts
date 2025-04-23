import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, PLATFORM_ID, Inject, ChangeDetectionStrategy  } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../Models/ProductDTO';
import { ProductService } from '../../Service/Product.Service';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../Service/Customer.Service';
import { isPlatformBrowser } from '@angular/common';
import { Color } from '../../Models/ColorDTO';
import { Size } from '../../Models/SizeDTO';
import { CartService } from '../../Service/Cart.Service';
import { CartItem } from '../../Models/CartDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent implements OnInit, AfterViewInit, OnDestroy{
  @ViewChild('navbar', {static: false}) navbar!: ElementRef;
  @ViewChild('banner', { static: false }) banner!: ElementRef;
  constructor(
    private productService: ProductService, 
    private router: Router, 
    private customerService: CustomerService,
    private cartService: CartService,
    private route: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ){}

    email: string = 'Ducpham.ms@gmail.com';
    products: Product [] = [];
    productdetail: any;
    isSearchVisible: boolean = false; // Trạng thái ẩn/hiện thanh tìm kiếm
    searchQuery: string = ''; // Từ khóa tìm kiếm
    page: number = 1;
    selectedImage: string = ''; // Biến lưu URL của ảnh chính
    colors: Color [] = []; // color
    sizes: Size [] = []; // size
    selectedcolor: number | null = null; // Lưu ID màu được chọn
    selectedsize: number | null = null;  // Lưu ID kích thước được chọn
    quantity: number = 1; // Giá trị mặc định
    availableQuantity: number = 0; // Số lượng còn lại trong kho
    DiscountPercentage: number = 0;
    isProductdetail: boolean = false;
    CountProduct: {[key: number]: number} = {}; // Đếm số sản phẩm đã bán 
    // slider
    slides: HTMLElement [] = [];
    currentIndex: number = 0;
    intervalTime = 5000; // thời gian chuyển slide (3 giây)
    autoSlideInterval: any;
    //
    async ngOnInit(): Promise<void> {
      this.LoadProduct();
      this.checkLoginStatus();
      //this.startSlideshow();
      // Trong ngOnInit hoặc nơi khởi tạo WOW:
      // Trong file main.ts hoặc ngOnInit của component
      if (isPlatformBrowser(this.platformId)) {
        new (window as any).WOW({
          boxClass: 'wow', // class apply cho phần tử
          animateClass: 'animate__animated', // class animation
          offset: 100, // giống data-wow-offset
          mobile: true, // kích hoạt trên di động
          live: true, // theo dõi DOM thay đổi
          callback: function(box: any) {
            // Có thể log khi chạy
          },
          resetAnimation: false // ✅ CHO PHÉP CHẠY LẠI
        }).init();
      }

    }
    // 
    ngAfterViewInit(): void {
      // Lấy tất cả phần tử có class "slide" trong banner
      this.slides = Array.from(this.banner.nativeElement.querySelectorAll('.slide'));
      this.startSlideshow(); // Bắt đầu sau khi slides đã được lấy
    }
    // 
    ngOnDestroy(): void {
      
    }
    // Loading sản phẩm 
    LoadProduct(){
      this.productService.GetProducts(this.page).subscribe(data =>{
        this.products = data.Products;
        this.products.forEach(product => {
          this.CountProducts(product.Id);
        });
        console.log('Response: ', data);
      })
    }
    CountProducts(Id: number){
      this.productService.CountProduct(Id).subscribe(data =>{
        this.CountProduct[Id] = data || 0;
      });
    }
    // Get product detail 
    GetProductDetail(Id: number){
      this.isProductdetail = true;
      this.productService.GetProductId(Id).subscribe(data =>{
        this.productdetail = data;
        // Lấy màu và size từ product
        this.colors = this.productdetail?.Colors || [];
        this.sizes = this.productdetail?.Sizes || [];
        this.DiscountPercentage = this.productdetail?.DiscountPercentage || 0;
        this.availableQuantity = this.productdetail?.Count || 0
        this.selectedImage = this.productdetail?.Images[0].Link || ''; // Gán ảnh mặc định là ảnh đầu tiên trong danh sách khi component khởi tạo
        // Điều chỉnh quantity nếu cần
        if (this.availableQuantity < this.quantity) {
          this.quantity = this.availableQuantity;
        }
      })
    }
    buyNow(product: Product): void {
        this.AddToCart(product);
        if (this.selectedcolor === null || this.selectedsize === null) {
          return;
        }
        if (this.quantity > this.availableQuantity) {
          return;
        }
        else{
          this.route.navigate(['/cart']);
        }
        
    }
    closeProductdetail(){
      this.isProductdetail = false;
    }
    // Add To Cart
    AddToCart(product: Product){
        if (this.selectedsize === null) {
          // alert('Vui lòng chọn màu và kích thước!');
          Swal.fire({
            icon: 'warning', // Biểu tượng cảnh báo
            title: 'Lỗi',
            text: 'Vui lòng chọn màu và kích thước!',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6',
            toast: true, // Hiển thị dạng toast (góc trên)
            position: 'top-end', // Vị trí góc trên bên phải
            timer: 3000, // Tự đóng sau 3 giây
            timerProgressBar: true, // Thanh tiến trình
          });
          return;
        }
        if (this.quantity > this.availableQuantity) {
          // alert('Số lượng vượt quá tồn kho!');
          Swal.fire({
            icon: 'warning', // Biểu tượng cảnh báo
            title: 'Lỗi',
            text: 'Số lượng vượt quá tồn kho!',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6',
            toast: true, // Hiển thị dạng toast (góc trên)
            position: 'top-end', // Vị trí góc trên bên phải
            timer: 3000, // Tự đóng sau 3 giây
            timerProgressBar: true, // Thanh tiến trình
          });
          return;
        }
        // Lấy thông tin user từ authService
        const CustomerId = this.customerService.getCustomerId(); // Giả sử trả về { id: number } hoặc null nếu chưa đăng nhập
        const productImage = product.Images && product.Images.length > 0 
        ? product.Images[0].Link 
        : 'assets/images/no-image.png'; // fallback ảnh mặc định nếu không có ảnh
    
        const discount = this.DiscountPercentage || 0;
        const unitPrice = product.Price || 0;
        const priceAfterDiscount = unitPrice * (1 - discount / 100);
        const cartItem: CartItem = {
          Id: 0,
          CustomerId: CustomerId ? +CustomerId: null, // Nếu chưa đăng nhập thì dùng ID = 0
          ProductId: product.Id,
          ProductName: product.Name,
          ProductImage: productImage,
          Quantity: this.quantity,
          ColorId: this.selectedcolor || 0,
          ColorName: this.colors.find(c => c.Id === this.selectedcolor)?.Name || '', // Lấy từ danh sách colors
          SizeId: this.selectedsize || 0,
          SizeName: this.sizes.find(s => s.Id === this.selectedsize)?.Name || '', // Lấy từ danh sách sizes
          UnitPrice: product.Price || 0,
          FinalPrice: priceAfterDiscount * this.quantity, // áp dụng nếu sản có giảm giá  
        };
        if (CustomerId) {
          // Nếu đã đăng nhập, gọi API để thêm vào giỏ hàng
          this.cartService.addToCart(cartItem).subscribe({
            next: (response) => {
              console.log('Cart: ',cartItem);
              this.loadCartItems(response.Id);
              // this.loadCartItems(); // Cập nhật lại giỏ hàng từ API
              this.quantity = 1;
              this.reset();
              this.isCart = true;
            },
            error: (err) => {
              console.error('Error adding to cart:', err);
              // alert('Có lỗi xảy ra khi thêm vào giỏ hàng!');
              Swal.fire({
                icon: 'warning', // Biểu tượng cảnh báo
                title: 'Lỗi',
                text: 'Có lỗi xảy ra khi thêm vào giỏ hàng!',
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6',
                toast: true, // Hiển thị dạng toast (góc trên)
                position: 'top-end', // Vị trí góc trên bên phải
                timer: 3000, // Tự đóng sau 3 giây
                timerProgressBar: true, // Thanh tiến trình
              });
            }
          });
        } else {
            let cart = this.cartService.getCartFromLocal();
    
            // Tìm sản phẩm đã tồn tại dựa trên ProductId, ColorId, SizeId
            const existingItem = cart.find(item =>
                item.ProductId === cartItem.ProductId &&
                item.ColorId === cartItem.ColorId &&
                item.SizeId === cartItem.SizeId
            );
    
            if (existingItem) {
                // Nếu sản phẩm đã tồn tại, tăng Quantity và cập nhật FinalPrice
                existingItem.Quantity += cartItem.Quantity;
                existingItem.FinalPrice = priceAfterDiscount * existingItem.Quantity; // GIÁ SAU KHI GIẢM
                console.log(`Updated quantity for item ${existingItem.Id} to ${existingItem.Quantity}`);
            } else {
                // Nếu sản phẩm chưa tồn tại, tạo Id duy nhất và thêm mới
                const maxId = cart.length > 0 ? Math.max(...cart.map((i) => i.Id)) : 0;
                const newId = maxId + 1;
                const newItem = {
                    ...cartItem,
                    Id: newId,
                    FinalPrice: priceAfterDiscount * cartItem.Quantity // GIÁ SAU KHI GIẢM
                };
                this.newCartId = newId;
                console.log(this.newCartId);
                this.isCart = true;
                cart.push(newItem);
                
            }
    
            // Lưu giỏ hàng vào localStorage
            this.cartService.saveCartToLocal(cart);
            this.reset();
            this.loadCartLocal();
            console.log('Cart:', cart);
          }
    }
      // Khi click vào thumbnail, thay đổi ảnh chính
    selectImage(imageUrl: string): void {
      this.selectedImage = imageUrl;
    }
    // Hàm chọn màu
    selectColor(color: any) {
      this.selectedcolor = color.Id;
      console.log(color);
      console.log('Selected Color ID:', this.selectedcolor);
    }

    // Hàm chọn size
    selectSize(size: any) {
      this.selectedsize = size.Id;
      console.log(size);
      console.log('Selected Size ID:', this.selectedsize);
    }
    // reset
    reset(){
      this.selectedcolor = null;
      this.selectedsize = null;
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
    // load product add to cart 
    cartItems: CartItem [] = [];
    newCartId: number = 0;
    isCart: boolean = false;
    loadCartItems(Id: number) {
      const CustomerId = this.customerService.getCustomerId();
      if (CustomerId) {
        // Nếu đã đăng nhập, lấy giỏ hàng từ API
        this.cartService.getCartId(Id).subscribe(data => {
          this.cartItems = data;
          console.log('Cart Items from API:', this.cartItems);
        })
      }
    }
    // load product add to cart local 
    loadCartLocal(){
      this.cartItems = this.cartService.getCartLocalById(this.newCartId).map(item => ({
        ...item,
        ProductName: item.ProductName || 'Không có tên',
        ColorName: item.ColorName || 'Không chọn',
        SizeName: item.SizeName || 'Không chọn'
      }));
      console.log('Cart Items from local storage:', this.cartItems);
    }
    closeCart(){
      this.isCart = false;
    }
    // xóa cartitem local 
    removeItem(CartId: number): void {
      const CustomerId = this.customerService.getCustomerId();
      if(CustomerId){
        this.cartService.deleteCartIteam(CartId).subscribe(data =>{
          console.log('Delete CartItemId: ', CartId);
          console.log(data);
        });
      }
      else{
        // Trường hợp chưa đăng nhập: Xóa item khỏi localStorage
        this.cartItems = this.cartItems.filter((i) => i.Id !== CartId);
        this.cartService.removeLocalCartId(CartId);
      }
    }
    // cập nhật số lượng sản phẩm (tăng)
    increaseQuantitycart(item: CartItem): void {
      item.Quantity++;
      item.FinalPrice = item.FinalPrice * item.Quantity; // Cập nhật FinalPrice
      this.cartService.updateLocalQuantity(item.Id, item.Quantity); // Cập nhật localStorage
    }
    // cập nhật số lượng sản phẩm (giảm) 
    decreaseQuantitycart(item: CartItem): void {
        if (item.Quantity > 1) { // Đảm bảo số lượng không nhỏ hơn 1
            item.Quantity--;
            item.FinalPrice = item.FinalPrice * item.Quantity; // Cập nhật FinalPrice
            this.cartService.updateLocalQuantity(item.Id, item.Quantity); // Cập nhật localStorage
        }
    }
    // tổng giá gốc 
    getTotalOriginalPrice(): number {
      return this.cartItems.reduce((total, item) => total + item.UnitPrice * item.Quantity, 0);
    }
    // tổng giá giảm 
    getTotalFinalPrice(): number {
      return this.cartItems.reduce((total, item) => total + item.FinalPrice * item.Quantity, 0);
    }
    // tổng tiền 
    getTotalDiscount(): number {
      return this.getTotalOriginalPrice() - this.getTotalFinalPrice();
    }
    // Bắt đầu chạy slide 
    startSlideshow() {
      setInterval(() => {
        this.nextSlide();
      }, this.intervalTime);
    }
    // Chuyển slide 
    prevSlide(): void {
      if (this.slides.length === 0) return;
      this.slides[this.currentIndex]?.classList.remove('active');
      this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
      this.slides[this.currentIndex]?.classList.add('active');
    }
    // Chuyển slide 
    nextSlide(): void {
      if (this.slides.length === 0) return;
      this.slides[this.currentIndex]?.classList.remove('active');
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      this.slides[this.currentIndex]?.classList.add('active');
    }
    // Bật tắt menu 
    toggleMenu() {
      const navbarElement = this.navbar.nativeElement;
      navbarElement.classList.toggle('active');
    }

    // Bật/tắt thanh tìm kiếm
    toggleSearch() {
      this.isSearchVisible = !this.isSearchVisible;
      if (!this.isSearchVisible) {
        this.searchQuery = ''; // Reset từ khóa khi đóng
      }
    }

    // Xử lý tìm kiếm
    onSearch() {
      if (this.searchQuery.trim()) {
        // Điều hướng tới trang /search với query param
        this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
        this.searchQuery = '';
        this.toggleSearch(); // Ẩn thanh tìm kiếm sau khi tìm
      } else {
        Swal.fire({
          icon: 'warning', // Biểu tượng cảnh báo
          title: 'Lỗi',
          text: 'Vui lòng nhập từ khóa tìm kiếm!',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
          toast: true, // Hiển thị dạng toast (góc trên)
          position: 'top-end', // Vị trí góc trên bên phải
          timer: 3000, // Tự đóng sau 3 giây
          timerProgressBar: true, // Thanh tiến trình
        });
        // alert('Vui lòng nhập từ khóa tìm kiếm!');
      }
    }
    // sử lý tìm kiếm theo thời gian thực 
    onSearchChange() {
      if (this.searchQuery.trim()) {
        this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
      }
    }
    // kiểm tra login 
    isLoggedIn: boolean = false;
    customerName: string | null = null;
    // Kiểm tra người dùng đã đăng nhập chưa
    checkLoginStatus(): void {
      const customerId = this.customerService.getCustomerId();
      const customerName = this.customerService.getCustomerName();
      this.isLoggedIn = !!customerId;
      this.customerName = customerName;
    }
    // Đăng xuất
    logout(): void {
      this.customerService.logout();
      this.isLoggedIn = false;
    }
}
