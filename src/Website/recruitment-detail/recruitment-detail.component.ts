
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

// Định nghĩa interface cho job details
interface JobDetail {
  title: string;
  date: string;
  views: number;
  description: string;
}

@Component({
  selector: 'app-recruitment-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './recruitment-detail.component.html',
  styleUrls: ['./recruitment-detail.component.css']
})
export class RecruitmentDetailComponent implements OnInit {
  @ViewChild('navbar', { static: false }) navbar!: ElementRef;
  email: string = 'Ducpham.ms@gmail.com';
  isSearchVisible: boolean = false;
  searchQuery: string = '';
  jobId: string | null = null;

  // Khai báo jobDetails với Record utility type
  jobDetails: Record<string, JobDetail> = {
    '1': {
      title: 'Nhân viên Facebook Ads',
      date: '16/07/2024 03:44 PM',
      views: 291,
      description: `
        <p><strong>NHÂN VIÊN FB ADS</strong></p>
        <p>Chamy Gaby là thương hiệu thời trang nữ đẳng cấp, sản phẩm là các thiết kế vô cùng đa dạng, sử dụng linh hoạt được trong các hoàn cảnh khác nhau, thương hiệu đã đi sâu vào lòng khách hàng. Các thiết kế vừa đặc sắc vừa đặt chất lượng lên hàng đầu, chúng tôi không chỉ mang đến phong cách mà còn thể hiện sự tự tin và cá nhân hóa cho phụ nữ hiện đại.</p>
        <p>Chamy Gaby - Thấu hiểu mong muốn phái đẹp, chúng tôi luôn đồng hành và lấy khách hàng làm trọng tâm. Thấu hiểu những tâm tư, tình cảm của tất cả chị em phụ nữ, những mong muốn hạnh phúc gia đình trọn vẹn và thành công trong sự nghiệp, chúng ta có thể chọn cả 2, Chamy Gaby sẵn sàng đồng hành cùng quý khách hàng trên con đường đó.</p>
        <h3>Thông tin về chúng tôi:</h3>
        <p><strong>LỊCH SỬ HÌNH THÀNH:</strong></p>
        <p>Nhen nhóm từ đầu năm 2020, đến ngày 17/04/2021 Công ty TNHH Đầu tư và phát triển thương mại Chamy chính thức thành lập.</p>
        <p>Từ những năm đầu thành lập với số lượng nhân viên ít ỏi, đến nay công ty đã tạo hơn 160 việc làm trực tiếp và hơn 200 việc làm gián tiếp trên toàn quốc.</p>
        <p>Tính đến nay Chamy đã có hệ thống 7 cửa hàng trên toàn quốc.</p>
        <p><strong>TẦM NHÌN:</strong></p>
        <p>Đến năm 2030 trở thành thương hiệu thời trang cao cấp uy tín hàng đầu Việt Nam với hơn 100 cửa hàng, 1000 nhân sự toàn quốc.</p>
        <p><strong>SỨ MỆNH:</strong></p>
        <ul>
          <li>Trở thành một thương hiệu thời trang cao cấp, mang đến cho khách hàng những trải nghiệm mới không ở đâu có được</li>
          <li>Phát triển con người là tiêu chí hàng đầu đánh giá thành công của CHAMY</li>
        </ul>
        <p><strong>GIÁ TRỊ CỐT LÕI:</strong></p>
        <ul>
          <li><strong>Học hỏi:</strong> Chủ động học tập và tự hoàn thiện bản thân. Hành động quyết liệt và tin tưởng sẽ đạt mục tiêu.</li>
          <li><strong>Chân thành:</strong> Thành thật quan tâm đến đồng đội, sẵn lòng hỗ trợ đồng đội, hướng dẫn, động viên để họ hoàn thành tốt công việc. Không làm thay, không bao che.</li>
          <li><strong>Kỷ luật:</strong> Nói gì làm đó. Làm đúng và đủ quy trình những nội dung đã cam kết, không làm dối, làm tắt. Tự nhận trách nhiệm và giải quyết hậu quả khi không giữ lời.</li>
          <li><strong>Tử tế:</strong> Sống biết ơn trung thực, đề cao những giá trị đạo đức. Không lấy, không sở hữu, không nghĩ đến việc chiếm hữu tiền bạc, tài sản, hàng hóa không phải của mình.</li>
          <li><strong>Sáng tạo:</strong> Luôn tìm tòi và sẵn sàng thử nghiệm phương pháp mới, chấp nhận thất bại, rút kinh nghiệm và tiếp tục hành động để đạt được thành công.</li>
        </ul>
        <p>Chúng tôi tin rằng với đội ngũ chuyên gia giàu kinh nghiệm, am hiểu sâu về lĩnh vực thời trang và có tinh thần trách nhiệm trong công việc sẽ là yếu tố quan trọng của sự thành công.</p>
        <h3>NHỮNG ƯU THẾ KHI LÀM VIỆC TẠI CHAMY GABY</h3>
        <p><strong>Thu nhập khủng:</strong> Thưởng cá nhân xuất sắc, thưởng theo đội nhóm, thưởng theo kết quả kinh doanh của công ty. Thưởng tháng lương thứ 13, thưởng lễ tết,...</p>
        <p><strong>Đào tạo phát triển:</strong> Đào tạo nội bộ các kĩ năng mềm, kĩ năng, chuyên môn làm việc hàng tháng; được cử đi đào tạo nâng cao chuyên môn.</p>
        <p><strong>Môi trường làm việc:</strong> Năng động, thân thiện, sáng tạo và kích thích khả năng phát triển cá nhân cao.</p>
        <p><strong>Các chế độ theo luật định:</strong> Đóng bảo hiểm, tuân thủ các chế độ theo Luật lao động hiện hành.</p>
        <p><strong>Hoạt động khác:</strong> Được tham dự các sự kiện hay và ý nghĩa; du lịch trong nước, team building,...</p>
        <h3>THÔNG TIN CÔNG TY</h3>
        <p><strong>Chức danh công việc:</strong> Nhân viên Facebook Ads</p>
        <p><strong>Số lượng:</strong> 03-05 người</p>
        <p><strong>Loại hình công việc:</strong> Toàn thời gian (Fulltime)</p>
        <p><strong>Thu nhập:</strong> 10.000.000 VNĐ – 15.000.000 VNĐ</p>
        <p><strong>Web công ty:</strong> <a href="https://www.chamy.vn/">https://www.chamy.vn/</a></p>
        <p><strong>Page công ty:</strong> <a href="https://www.facebook.com/Chamytd">https://www.facebook.com/Chamytd</a></p>
        <p><strong>Địa điểm làm việc:</strong> 5N7 TT5 KĐT Bắc Linh Đàm, Đặng Xuân Bảng, Đại Kim, Hoàng Mai, HN</p>
        <h3>MÔ TẢ CÔNG VIỆC</h3>
        <p><strong>Nhiệm vụ, trách nhiệm chính:</strong></p>
        <ul>
          <li>Xây dựng kế hoạch và trực tiếp triển khai chạy quảng cáo Facebook Ads.</li>
          <li>Hiểu được insight khách hàng, đề xuất các phương án triển khai.</li>
          <li>Lên kế hoạch chi phí cho các chiến dịch.</li>
          <li>Chủ động tối ưu quảng cáo dựa trên chi phí đã đưa ra.</li>
          <li>Theo dõi đánh giá để tối ưu về thiết kế, nội dung, chi phí, tỉ lệ chuyển đổi của các chiến dịch quảng cáo. Đảm bảo hướng đúng đến đối tượng khách hàng mục tiêu.</li>
          <li>Nghiên cứu đối thủ, phân tích báo giá, đề xuất ngân sách và kịch bản triển khai nhằm tạo lợi thế cạnh tranh.</li>
          <li>Cập nhật xu hướng nội dung và thuật toán Facebook, vận hành, tối ưu quảng cáo nhằm đạt được KPI đã đề ra.</li>
          <li>Đồng bộ thông tin, phối hợp phòng ban triển khai đơn hàng.</li>
          <li>Thực hiện các công việc khác theo sự phân công của Trưởng bộ phận.</li>
        </ul>
        <h3>YÊU CẦU</h3>
        <p><strong>Học vấn:</strong> Bằng cấp: Tốt nghiệp Trung cấp trở lên.</p>
        <p><strong>Kinh nghiệm:</strong> Có kinh nghiệm từ 1-2 năm chạy ads</p>
        <p><strong>Kỹ năng:</strong></p>
        <ul>
          <li>Phân tích dữ liệu.</li>
          <li>Kỹ năng lập kế hoạch.</li>
        </ul>
        <p><strong>Thái độ/ tính cách:</strong></p>
        <ul>
          <li>Nhanh nhẹn, linh hoạt.</li>
          <li>Thẳng thắn, trung thực.</li>
          <li>Thân thiện, hoạt ngôn</li>
        </ul>
        <h3>CÁC CHÍNH SÁCH KHÁC</h3>
        <p><strong>Mức lương:</strong> Thu nhập: 10.000.000 - 15.000.000 VNĐ/tháng</p>
        <p><strong>Thời gian làm việc:</strong> 9h-17h, Từ T2 – T7</p>
        <p><strong>Quyền lợi:</strong></p>
        <ul>
          <li>Cơ hội thăng tiến lên cấp quản lý Leader Marketing, trưởng phòng Marketing</li>
          <li>Thưởng tháng lương thứ 13</li>
          <li>Du lịch, nghỉ mát, team building, Year End Party…</li>
          <li>Nghỉ lễ theo lịch quốc gia & thưởng nóng (Tết dương lịch, 8/3, 30/4, 1/5,…).</li>
          <li>Được chiết khấu khi mua các sản phẩm thời trang mang thương hiệu Chamy.</li>
        </ul>
        <h3>CÁCH THỨC ỨNG TUYỂN</h3>
        <p>Ứng viên gửi CV bản mềm qua email: <a href="mailto:quynhdung.hr@chamy.com.vn">quynhdung.hr@chamy.com.vn</a></p>
        <p>Tiêu đề: “Họ và tên – Vị trí”</p>
        <p>Thông tin cần được hỗ trợ, vui lòng gọi hotline: <a href="tel:0983531552">0983531552</a></p>
      `
    },
    '2': {
      title: 'Nhân viên bán hàng',
      date: '09/07/2024 11:20 AM',
      views: 232,
      description: `
        <p><strong>NHÂN VIÊN BÁN HÀNG</strong></p>
        <p>Chamy Gaby là thương hiệu thời trang nữ đẳng cấp, sản phẩm là các thiết kế vô cùng đa dạng, sử dụng linh hoạt được trong các hoàn cảnh khác nhau, thương hiệu đã đi sâu vào lòng khách hàng. Các thiết kế vừa đặc sắc vừa đặt chất lượng lên hàng đầu, chúng tôi không chỉ mang đến phong cách mà còn thể hiện sự tự tin và cá nhân hóa cho phụ nữ hiện đại.</p>
        <p>Chamy Gaby - Thấu hiểu mong muốn phái đẹp, chúng tôi luôn đồng hành và lấy khách hàng làm trọng tâm. Thấu hiểu những tâm tư, tình cảm của tất cả chị em phụ nữ, những mong muốn hạnh phúc gia đình trọn vẹn và thành công trong sự nghiệp, chúng ta có thể chọn cả 2, Chamy Gaby sẵn sàng đồng hành cùng quý khách hàng trên con đường đó.</p>
        <h3>Thông tin về chúng tôi:</h3>
        <p><strong>LỊCH SỬ HÌNH THÀNH:</strong></p>
        <p>Nhen nhóm từ đầu năm 2020, đến ngày 17/04/2021 Công ty TNHH Đầu tư và phát triển thương mại Chamy chính thức thành lập.</p>
        <p>Từ những năm đầu thành lập với số lượng nhân viên ít ỏi, đến nay công ty đã tạo hơn 160 việc làm trực tiếp và hơn 200 việc làm gián tiếp trên toàn quốc.</p>
        <p>Tính đến nay Chamy đã có hệ thống 7 cửa hàng trên toàn quốc.</p>
        <p><strong>TẦM NHÌN:</strong></p>
        <p>Đến năm 2030 trở thành thương hiệu thời trang cao cấp uy tín hàng đầu Việt Nam với hơn 100 cửa hàng, 1000 nhân sự toàn quốc.</p>
        <p><strong>SỨ MỆNH:</strong></p>
        <ul>
          <li>Trở thành một thương hiệu thời trang cao cấp, mang đến cho khách hàng những trải nghiệm mới không ở đâu có được</li>
          <li>Phát triển con người là tiêu chí hàng đầu đánh giá thành công của CHAMY</li>
        </ul>
        <p><strong>GIÁ TRỊ CỐT LÕI:</strong></p>
        <ul>
          <li><strong>Học hỏi:</strong> Chủ động học tập và tự hoàn thiện bản thân. Hành động quyết liệt và tin tưởng sẽ đạt mục tiêu.</li>
          <li><strong>Chân thành:</strong> Thành thật quan tâm đến đồng đội, sẵn lòng hỗ trợ đồng đội, hướng dẫn, động viên để họ hoàn thành tốt công việc. Không làm thay, không bao che.</li>
          <li><strong>Kỷ luật:</strong> Nói gì làm đó. Làm đúng và đủ quy trình những nội dung đã cam kết, không làm dối, làm tắt. Tự nhận trách nhiệm và giải quyết hậu quả khi không giữ lời.</li>
          <li><strong>Tử tế:</strong> Sống biết ơn trung thực, đề cao những giá trị đạo đức. Không lấy, không sở hữu, không nghĩ đến việc chiếm hữu tiền bạc, tài sản, hàng hóa không phải của mình.</li>
          <li><strong>Sáng tạo:</strong> Luôn tìm tòi và sẵn sàng thử nghiệm phương pháp mới, chấp nhận thất bại, rút kinh nghiệm và tiếp tục hành động để đạt được thành công.</li>
        </ul>
        <p>Chúng tôi tin rằng với đội ngũ chuyên gia giàu kinh nghiệm, am hiểu sâu về lĩnh vực thời trang và có tinh thần trách nhiệm trong công việc sẽ là yếu tố quan trọng của sự thành công.</p>
        <h3>NHỮNG ƯU THẾ KHI LÀM VIỆC TẠI CHAMY GABY</h3>
        <p><strong>Thu nhập khủng:</strong> Thưởng cá nhân xuất sắc, thưởng theo đội nhóm, thưởng theo kết quả kinh doanh của công ty. Thưởng tháng lương thứ 13, thưởng lễ tết,...</p>
        <p><strong>Đào tạo phát triển:</strong> Đào tạo nội bộ các kỹ năng mềm, kỹ năng, chuyên môn làm việc hàng tháng; được cử đi đào tạo nâng cao chuyên môn.</p>
        <p><strong>Môi trường làm việc:</strong> Năng động, thân thiện, sáng tạo và kích thích khả năng phát triển cá nhân cao.</p>
        <p><strong>Các chế độ theo luật định:</strong> Đóng bảo hiểm, tuân thủ các chế độ theo Luật lao động hiện hành.</p>
        <p><strong>Hoạt động khác:</strong> Được tham dự các sự kiện hay và ý nghĩa; du lịch trong nước, team building,...</p>
        <h3>THÔNG TIN CÔNG TY</h3>
        <p><strong>Chức danh công việc:</strong> Nhân viên bán hàng</p>
        <p><strong>Số lượng:</strong> 03 người</p>
        <p><strong>Cơ sở:</strong></p>
        <ul>
          <li>313 Phố Huế, Hai Bà Trưng, Hà Nội</li>
          <li>342 Thái Hà, Đống Đa, Hà Nội</li>
          <li>172 Cầu Giấy, Quan Hoa, Cầu Giấy, Hà Nội</li>
          <li>216 Nguyễn Trãi, Thanh Xuân, Hà Nội (coming soon)</li>
          <li>124 Nguyễn Trãi Phường 3, Quận 5, TP.HCM</li>
          <li>236-238 Nguyễn Đình Chiểu, P.Võ Thị Sáu, Q.3, TP.HCM</li>
          <li>524 Lê Văn Sỹ, P.14, Q.3, TP.HCM</li>
          <li>120 Lê Hoàn, Phường Lam Sơn, Tp. Thanh Hóa</li>
        </ul>
        <p><strong>Loại hình công việc:</strong> Thời gian làm việc xoay ca liên tục</p>
        <p><strong>Thời gian làm việc:</strong></p>
        <ul>
          <li>Ca 1: 8h30 đến 15h30</li>
          <li>Ca 2: 15h00 đến 22h00</li>
        </ul>
        <p><strong>Thu nhập:</strong> 9.000.000 VNĐ – 11.000.000 VNĐ</p>
        <p><strong>Web công ty:</strong> <a href="https://chamygaby.vn/tuyen-dung">https://chamygaby.vn/tuyen-dung</a></p>
        <p><strong>Page công ty:</strong> <a href="https://www.facebook.com/Chamytd">https://www.facebook.com/Chamytd</a></p>
        <p><strong>Địa điểm làm việc:</strong> Tại cơ sở ứng tuyển</p>
        <h3>MÔ TẢ CÔNG VIỆC</h3>
        <p><strong>Nhiệm vụ, trách nhiệm chính:</strong></p>
        <ul>
          <li>Tư vấn bán hàng và thực hiện các công việc tại cửa hàng.</li>
        </ul>
        <h3>YÊU CẦU</h3>
        <p><strong>Học vấn:</strong> Bằng cấp: Tốt nghiệp THPT trở lên.</p>
        <p><strong>Kinh nghiệm:</strong> Có kinh nghiệm bán hàng là một lợi thế, không có sẽ đào tạo.</p>
        <p><strong>Giới tính:</strong> Nữ</p>
        <p><strong>Tuổi:</strong> Từ 22 - 30</p>
        <p><strong>Kỹ năng:</strong></p>
        <ul>
          <li>Nhanh nhẹn, linh hoạt.</li>
          <li>Thẳng thắn, trung thực.</li>
          <li>Thân thiện, hoạt ngôn.</li>
        </ul>
        <p><strong>Thái độ/ tính cách:</strong></p>
        <ul>
          <li>Chính trực, trung thực, cẩn thận, chi tiết, hòa đồng.</li>
          <li>Hoạt ngôn, hay nói. Không trầm tính.</li>
        </ul>
        <h3>CÁC CHÍNH SÁCH KHÁC</h3>
        <p><strong>Mức lương:</strong> Thu nhập: 9.000.000 - 11.000.000 VNĐ/tháng</p>
        <p><strong>Thời gian làm việc:</strong></p>
        <ul>
          <li>Ca 1: 8h30 - 15h30</li>
          <li>Ca 2: 15h - 22h</li>
          <li>Hình thức: Xoay ca luân phiên 2 ca</li>
          <li>Tháng nghỉ 4 ngày</li>
        </ul>
        <p><strong>Quyền lợi:</strong></p>
        <ul>
          <li>Cơ hội thăng tiến lên cấp quản lý Cửa hàng trưởng - Quản lý vùng - Quản lý chuỗi - Trưởng phòng KD</li>
          <li>Thưởng tháng lương thứ 13</li>
          <li>Du lịch, nghỉ mát, team building, Year End Party…</li>
          <li>Nghỉ lễ theo lịch quốc gia & thưởng nóng (Tết dương lịch, 8/3, 30/4, 1/5,…).</li>
          <li>Được chiết khấu khi mua các sản phẩm thời trang mang thương hiệu Chamy.</li>
        </ul>
        <h3>CÁCH THỨC ỨNG TUYỂN</h3>
        <p>Ứng viên gửi CV bản mềm qua email: <a href="mailto:quynhdung.hr@chamy.com.vn">quynhdung.hr@chamy.com.vn</a></p>
        <p>Tiêu đề: “Họ và tên – Vị trí”</p>
        <p>Thông tin cần được hỗ trợ, vui lòng gọi hotline: <a href="tel:0983531552">0983531552</a></p>
      `
    },
    '3': {
      title: 'Trưởng phòng Marketing',
      date: '09/07/2024 11:04 AM',
      views: 148,
      description: `
        <p><strong>TRƯỞNG PHÒNG MARKETING</strong></p>
        <p>Chamy Gaby là thương hiệu thời trang nữ đẳng cấp, sản phẩm là các thiết kế vô cùng đa dạng, sử dụng linh hoạt được trong các hoàn cảnh khác nhau, thương hiệu đã đi sâu vào lòng khách hàng. Các thiết kế vừa đặc sắc vừa đặt chất lượng lên hàng đầu, chúng tôi không chỉ mang đến phong cách mà còn thể hiện sự tự tin và cá nhân hóa cho phụ nữ hiện đại.</p>
        <p>Chamy Gaby - Thấu hiểu mong muốn phái đẹp, chúng tôi luôn đồng hành và lấy khách hàng làm trọng tâm. Thấu hiểu những tâm tư, tình cảm của tất cả chị em phụ nữ, những mong muốn hạnh phúc gia đình trọn vẹn và thành công trong sự nghiệp, chúng ta có thể chọn cả 2, Chamy Gaby sẵn sàng đồng hành cùng quý khách hàng trên con đường đó.</p>
        <h3>Thông tin về chúng tôi:</h3>
        <p><strong>LỊCH SỬ HÌNH THÀNH:</strong></p>
        <p>Nhen nhóm từ đầu năm 2020, đến ngày 17/04/2021 Công ty TNHH Đầu tư và phát triển thương mại Chamy chính thức thành lập.</p>
        <p>Từ những năm đầu thành lập với số lượng nhân viên ít ỏi, đến nay công ty đã tạo hơn 160 việc làm trực tiếp và hơn 200 việc làm gián tiếp trên toàn quốc.</p>
        <p>Tính đến nay Chamy đã có hệ thống 7 cửa hàng trên toàn quốc.</p>
        <p><strong>TẦM NHÌN:</strong></p>
        <p>Đến năm 2030 trở thành thương hiệu thời trang cao cấp uy tín hàng đầu Việt Nam với hơn 100 cửa hàng, 1000 nhân sự toàn quốc.</p>
        <p><strong>SỨ MỆNH:</strong></p>
        <ul>
          <li>Trở thành một thương hiệu thời trang cao cấp, mang đến cho khách hàng những trải nghiệm mới không ở đâu có được</li>
          <li>Phát triển con người là tiêu chí hàng đầu đánh giá thành công của CHAMY</li>
        </ul>
        <p><strong>GIÁ TRỊ CỐT LÕI:</strong></p>
        <ul>
          <li><strong>Học hỏi:</strong> Chủ động học tập và tự hoàn thiện bản thân. Hành động quyết liệt và tin tưởng sẽ đạt mục tiêu.</li>
          <li><strong>Chân thành:</strong> Thành thật quan tâm đến đồng đội, sẵn lòng hỗ trợ đồng đội, hướng dẫn, động viên để họ hoàn thành tốt công việc. Không làm thay, không bao che.</li>
          <li><strong>Kỷ luật:</strong> Nói gì làm đó. Làm đúng và đủ quy trình những nội dung đã cam kết, không làm dối, làm tắt. Tự nhận trách nhiệm và giải quyết hậu quả khi không giữ lời.</li>
          <li><strong>Tử tế:</strong> Sống biết ơn trung thực, đề cao những giá trị đạo đức. Không lấy, không sở hữu, không nghĩ đến việc chiếm hữu tiền bạc, tài sản, hàng hóa không phải của mình.</li>
          <li><strong>Sáng tạo:</strong> Luôn tìm tòi và sẵn sàng thử nghiệm phương pháp mới, chấp nhận thất bại, rút kinh nghiệm và tiếp tục hành động để đạt được thành công.</li>
        </ul>
        <p>Chúng tôi tin rằng với đội ngũ chuyên gia giàu kinh nghiệm, am hiểu sâu về lĩnh vực thời trang và có tinh thần trách nhiệm trong công việc sẽ là yếu tố quan trọng của sự thành công.</p>
        <h3>NHỮNG ƯU THẾ KHI LÀM VIỆC TẠI CHAMY GABY</h3>
        <p><strong>Thu nhập khủng:</strong> Thưởng cá nhân xuất sắc, thưởng theo đội nhóm, thưởng theo kết quả kinh doanh của công ty. Thưởng tháng lương thứ 13, thưởng lễ tết,...</p>
        <p><strong>Đào tạo phát triển:</strong> Đào tạo nội bộ các kỹ năng mềm, kỹ năng, chuyên môn làm việc hàng tháng; được cử đi đào tạo nâng cao chuyên môn.</p>
        <p><strong>Môi trường làm việc:</strong> Năng động, thân thiện, sáng tạo và kích thích khả năng phát triển cá nhân cao.</p>
        <p><strong>Các chế độ theo luật định:</strong> Đóng bảo hiểm, tuân thủ các chế độ theo Luật lao động hiện hành.</p>
        <p><strong>Hoạt động khác:</strong> Được tham dự các sự kiện hay và ý nghĩa; du lịch trong nước, team building,...</p>
        <h3>THÔNG TIN CÔNG TY</h3>
        <p><strong>Chức danh công việc:</strong> Trưởng phòng Marketing</p>
        <p><strong>Số lượng:</strong> 01 người</p>
        <p><strong>Loại hình công việc:</strong> Toàn thời gian (Fulltime)</p>
        <p><strong>Thu nhập:</strong> 30.000.000 VNĐ – 50.000.000 VNĐ (Lương cứng 20.000.000 - 30.000.000 + Thưởng)</p>
        <p><strong>Web công ty:</strong> <a href="https://www.chamy.vn/">https://www.chamy.vn/</a></p>
        <p><strong>Page công ty:</strong> <a href="https://www.facebook.com/Chamytd">https://www.facebook.com/Chamytd</a></p>
        <p><strong>Địa điểm làm việc:</strong> 5N7 TT5 KĐT Bắc Linh Đàm, Đặng Xuân Bảng, Đại Kim, Hoàng Mai, HN</p>
        <h3>MÔ TẢ CÔNG VIỆC</h3>
        <p><strong>Nhiệm vụ, trách nhiệm chính:</strong></p>
        <ul>
          <li>Nghiên cứu, phát triển, vận hành hệ thống Marketing đa kênh nhằm hỗ trợ bán hàng.</li>
          <li>Dựa trên các mục tiêu doanh số & tối ưu chi phí trên doanh thu để lên kế hoạch truyền thông đa kênh theo quý, theo tháng.</li>
          <li>Phân bổ nguồn lực (nhân sự, ngân sách) cho từng kênh để đảm bảo kết quả performance marketing cũng như đạt được các mục tiêu về chỉ số vận hành, mục tiêu doanh số.</li>
          <li>Phát triển nhận diện, định vị thương hiệu và quản trị hiệu quả các chiến dịch truyền thông đa kênh Social.</li>
          <li>Làm việc với các Agency (Báo chí, KOLs, KOC, Event…) để đạt hiệu quả chiến dịch Marketing.</li>
          <li>Phối hợp phòng Kinh doanh triển khai các chương trình marketing về sản phẩm, về giá, kênh phân phối, quảng cáo, khuyến mãi… để tiếp cận, duy trì và mở rộng tệp khách hàng mục tiêu, kéo khách hàng mục tiêu về nhằm đảm bảo doanh số.</li>
          <li>Kiểm soát chi phí chạy quảng cáo của nhân viên chạy quảng cáo.</li>
          <li>Quản lý đội ngũ Content Viral, Brand Marketing trong việc tối ưu hình ảnh truyền thông.</li>
          <li>Kết hợp với các phòng ban để theo sát và báo cáo, cập nhật tiến độ công việc, kết quả thực hiện.</li>
          <li>Quản lý đội ngũ: Tổ chức, đào tạo và quản lý các nhân viên trong bộ phận Marketing để đạt được các mục tiêu kinh doanh.</li>
          <li>Các công việc khác theo sự phân công của Ban giám đốc.</li>
          <li>Báo cáo định kỳ: Cập nhật, báo cáo công việc theo quy định và khi được yêu cầu.</li>
        </ul>
        <h3>YÊU CẦU</h3>
        <p><strong>Học vấn:</strong> Tốt nghiệp Đại học trở lên các chuyên ngành Marketing, Truyền thông, Quản trị kinh doanh, Công nghệ thông tin...</p>
        <p><strong>Kinh nghiệm:</strong></p>
        <ul>
          <li>Có hơn 3 năm kinh nghiệm làm việc trong lĩnh vực Marketing.</li>
          <li>Có hơn 1 năm kinh nghiệm quản lý đội ngũ.</li>
          <li>Ưu tiên ứng viên có kinh nghiệm trong ngành Thời trang, thẩm mỹ…</li>
        </ul>
        <p><strong>Kỹ năng:</strong></p>
        <ul>
          <li>Kiến thức chuyên sâu về các kênh quảng cáo online và offline.</li>
          <li>Khả năng phân tích dữ liệu và đưa ra các phương án cải tiến.</li>
          <li>Kỹ năng quản lý dự án và kỹ năng lãnh đạo.</li>
          <li>Có kinh nghiệm và kiến thức đọc hiểu các chỉ số kinh doanh.</li>
        </ul>
        <p><strong>Thái độ/ tính cách:</strong></p>
        <ul>
          <li>Có khả năng kiểm tra, theo dõi công việc của đội nhóm, có khả năng lên kế hoạch, làm việc chi tiết, tỉ mỉ.</li>
          <li>Chịu được áp lực cao trong công việc.</li>
        </ul>
        <h3>CÁC CHÍNH SÁCH KHÁC</h3>
        <p><strong>Thu nhập:</strong> 30.000.000 - 50.000.000 VNĐ/tháng (Lương cứng từ 20.000.000 - 25.000.000/tháng + Thưởng)</p>
        <p><strong>Thời gian làm việc:</strong> Thứ 2 - Thứ 7, từ 08h00 – 12h00 & 13h00 - 17h00</p>
        <p><strong>Quyền lợi:</strong></p>
        <ul>
          <li>Đề xuất tăng lương định kỳ từ 1 lần/năm.</li>
          <li>Thưởng tháng lương thứ 13.</li>
          <li>Đóng BHXH, BHYT, thưởng nghỉ lễ Tết theo quy định nhà nước.</li>
          <li>Du lịch, nghỉ mát, team building, Year End Party…</li>
          <li>Nghỉ lễ theo lịch quốc gia & thưởng tiền (Tết dương lịch, 8/3, 30/4, 1/5,…).</li>
          <li>Được chiết khấu khi mua các sản phẩm thời trang mang thương hiệu Chamy.</li>
        </ul>
        <h3>CÁCH THỨC ỨNG TUYỂN</h3>
        <p>Ứng viên gửi CV bản mềm qua email: <a href="mailto:quynhdung.hr@chamy.com.vn">quynhdung.hr@chamy.com.vn</a></p>
        <p>Tiêu đề: “Họ và tên – Vị trí”</p>
        <p>Thông tin cần được hỗ trợ, vui lòng gọi hotline: <a href="tel:0983531552">0983531552</a></p>
      `
    },
    '4': {
      title: 'Nhân viên Sale Online',
      date: '02/07/2024 02:13 PM',
      views: 299,
      description: `
        <p><strong>NHÂN VIÊN SALE ONLINE</strong></p>
        <p>Chamy Gaby là thương hiệu thời trang nữ đẳng cấp, sản phẩm là các thiết kế vô cùng đa dạng, sử dụng linh hoạt được trong các hoàn cảnh khác nhau, thương hiệu đã đi sâu vào lòng khách hàng. Các thiết kế vừa đặc sắc vừa đặt chất lượng lên hàng đầu, chúng tôi không chỉ mang đến phong cách mà còn thể hiện sự tự tin và cá nhân hóa cho phụ nữ hiện đại.</p>
        <p>Chamy Gaby - Thấu hiểu mong muốn phái đẹp, chúng tôi luôn đồng hành và lấy khách hàng làm trọng tâm. Thấu hiểu những tâm tư, tình cảm của tất cả chị em phụ nữ, những mong muốn hạnh phúc gia đình trọn vẹn và thành công trong sự nghiệp, chúng ta có thể chọn cả 2, Chamy Gaby sẵn sàng đồng hành cùng quý khách hàng trên con đường đó.</p>
        <h3>Thông tin về chúng tôi:</h3>
        <p><strong>LỊCH SỬ HÌNH THÀNH:</strong></p>
        <p>Nhen nhóm từ đầu năm 2020, đến ngày 17/04/2021 Công ty TNHH Đầu tư và phát triển thương mại Chamy chính thức thành lập.</p>
        <p>Từ những năm đầu thành lập với số lượng nhân viên ít ỏi, đến nay công ty đã tạo hơn 160 việc làm trực tiếp và hơn 200 việc làm gián tiếp trên toàn quốc.</p>
        <p>Tính đến nay Chamy đã có hệ thống 7 cửa hàng trên toàn quốc.</p>
        <p><strong>TẦM NHÌN:</strong></p>
        <p>Đến năm 2030 trở thành thương hiệu thời trang cao cấp uy tín hàng đầu Việt Nam với hơn 100 cửa hàng, 1000 nhân sự toàn quốc.</p>
        <p><strong>SỨ MỆNH:</strong></p>
        <ul>
          <li>Trở thành một thương hiệu thời trang cao cấp, mang đến cho khách hàng những trải nghiệm mới không ở đâu có được</li>
          <li>Phát triển con người là tiêu chí hàng đầu đánh giá thành công của CHAMY</li>
        </ul>
        <p><strong>GIÁ TRỊ CỐT LÕI:</strong></p>
        <ul>
          <li><strong>Học hỏi:</strong> Chủ động học tập và tự hoàn thiện bản thân. Hành động quyết liệt và tin tưởng sẽ đạt mục tiêu.</li>
          <li><strong>Chân thành:</strong> Thành thật quan tâm đến đồng đội, sẵn lòng hỗ trợ đồng đội, hướng dẫn, động viên để họ hoàn thành tốt công việc. Không làm thay, không bao che.</li>
          <li><strong>Kỷ luật:</strong> Nói gì làm đó. Làm đúng và đủ quy trình những nội dung đã cam kết, không làm dối, làm tắt. Tự nhận trách nhiệm và giải quyết hậu quả khi không giữ lời.</li>
          <li><strong>Tử tế:</strong> Sống biết ơn trung thực, đề cao những giá trị đạo đức. Không lấy, không sở hữu, không nghĩ đến việc chiếm hữu tiền bạc, tài sản, hàng hóa không phải của mình.</li>
          <li><strong>Sáng tạo:</strong> Luôn tìm tòi và sẵn sàng thử nghiệm phương pháp mới, chấp nhận thất bại, rút kinh nghiệm và tiếp tục hành động để đạt được thành công.</li>
        </ul>
        <p>Chúng tôi tin rằng với đội ngũ chuyên gia giàu kinh nghiệm, am hiểu sâu về lĩnh vực thời trang và có tinh thần trách nhiệm trong công việc sẽ là yếu tố quan trọng của sự thành công.</p>
        <h3>NHỮNG ƯU THẾ KHI LÀM VIỆC TẠI CHAMY GABY</h3>
        <p><strong>Thu nhập khủng:</strong> Thưởng cá nhân xuất sắc, thưởng theo đội nhóm, thưởng theo kết quả kinh doanh của công ty. Thưởng tháng lương thứ 13, thưởng lễ tết,...</p>
        <p><strong>Đào tạo phát triển:</strong> Đào tạo nội bộ các kỹ năng mềm, kỹ năng, chuyên môn làm việc hàng tháng; được cử đi đào tạo nâng cao chuyên môn.</p>
        <p><strong>Môi trường làm việc:</strong> Năng động, thân thiện, sáng tạo và kích thích khả năng phát triển cá nhân cao.</p>
        <p><strong>Các chế độ theo luật định:</strong> Đóng bảo hiểm, tuân thủ các chế độ theo Luật lao động hiện hành.</p>
        <p><strong>Hoạt động khác:</strong> Được tham dự các sự kiện hay và ý nghĩa; du lịch trong nước, team building,...</p>
        <h3>THÔNG TIN CÔNG TY</h3>
        <p><strong>Chức danh công việc:</strong> Nhân viên Sale Online</p>
        <p><strong>Số lượng:</strong> 2 người</p>
        <p><strong>Loại hình công việc:</strong> Toàn thời gian (Fulltime)</p>
        <p><strong>Thu nhập:</strong> 8.000.000 VNĐ – 15.000.000 VNĐ</p>
        <p><strong>Web công ty:</strong> <a href="https://www.chamy.vn/">https://www.chamy.vn/</a></p>
        <p><strong>Page công ty:</strong> <a href="https://www.facebook.com/Chamytd">https://www.facebook.com/Chamytd</a></p>
        <p><strong>Địa điểm làm việc:</strong> 5N7 TT5 KĐT Bắc Linh Đàm, Đặng Xuân Bảng, Đại Kim, Hoàng Mai, HN</p>
        <h3>MÔ TẢ CÔNG VIỆC</h3>
        <p><strong>Nhiệm vụ, trách nhiệm chính:</strong></p>
        <ul>
          <li>Chat, tư vấn, chốt đơn.</li>
        </ul>
        <h3>YÊU CẦU</h3>
        <p><strong>Công cụ làm việc:</strong> Có máy tính cá nhân.</p>
        <p><strong>Kinh nghiệm:</strong></p>
        <ul>
          <li>Giọng nói dễ nghe, không nói ngọng.</li>
          <li>Kinh nghiệm: Từ 6 tháng trở lên trong mảng thời trang là một lợi thế.</li>
          <li>Giới tính: Nữ.</li>
          <li>Hoạt ngôn, năng động.</li>
        </ul>
        <p><strong>Kỹ năng:</strong></p>
        <ul>
          <li>Đánh máy, sử dụng bàn phím, chat nhanh.</li>
        </ul>
        <p><strong>Thái độ/ tính cách:</strong></p>
        <ul>
          <li>Nhanh nhẹn, linh hoạt.</li>
          <li>Thẳng thắn, trung thực.</li>
          <li>Thân thiện, hoạt ngôn.</li>
        </ul>
        <h3>CÁC CHÍNH SÁCH KHÁC</h3>
        <p><strong>Mức lương:</strong> Thu nhập: 8.000.000 - 15.000.000 VNĐ/tháng</p>
        <p><strong>Thời gian làm việc:</strong> 8h-17h, Từ T2 – T7</p>
        <p><strong>Quyền lợi:</strong></p>
        <ul>
          <li>Cơ hội thăng tiến lên cấp quản lý Leader Sale, Trưởng phòng Kinh doanh.</li>
          <li>Thưởng tháng lương thứ 13.</li>
          <li>Du lịch, nghỉ mát, team building, Year End Party…</li>
          <li>Nghỉ lễ theo lịch quốc gia & thưởng nóng (Tết dương lịch, 8/3, 30/4, 1/5,…).</li>
          <li>Được chiết khấu khi mua các sản phẩm thời trang mang thương hiệu Chamy.</li>
        </ul>
        <h3>CÁCH THỨC ỨNG TUYỂN</h3>
        <p>Ứng viên gửi CV bản mềm qua email: <a href="mailto:quynhdung.hr@chamy.com.vn">quynhdung.hr@chamy.com.vn</a></p>
        <p>Tiêu đề: “Họ và tên – Vị trí”</p>
        <p>Thông tin cần được hỗ trợ, vui lòng gọi hotline: <a href="tel:0983531552">0983531552</a></p>
      `
    },
    '5': {
      title: 'Nhân viên Chăm sóc khách hàng',
      date: '02/07/2024 02:13 PM',
      views: 221,
      description: `
        <p><strong>NHÂN VIÊN CHĂM SÓC KHÁCH HÀNG</strong></p>
        <p>Chamy Gaby là thương hiệu thời trang nữ đẳng cấp, sản phẩm là các thiết kế vô cùng đa dạng, sử dụng linh hoạt được trong các hoàn cảnh khác nhau, thương hiệu đã đi sâu vào lòng khách hàng. Các thiết kế vừa đặc sắc vừa đặt chất lượng lên hàng đầu, chúng tôi không chỉ mang đến phong cách mà còn thể hiện sự tự tin và cá nhân hóa cho phụ nữ hiện đại.</p>
        <p>Chamy Gaby - Thấu hiểu mong muốn phái đẹp, chúng tôi luôn đồng hành và lấy khách hàng làm trọng tâm. Thấu hiểu những tâm tư, tình cảm của tất cả chị em phụ nữ, những mong muốn hạnh phúc gia đình trọn vẹn và thành công trong sự nghiệp, chúng ta có thể chọn cả 2, Chamy Gaby sẵn sàng đồng hành cùng quý khách hàng trên con đường đó.</p>
        <h3>Thông tin về chúng tôi:</h3>
        <p><strong>LỊCH SỬ HÌNH THÀNH:</strong></p>
        <p>Nhen nhóm từ đầu năm 2020, đến ngày 17/04/2021 Công ty TNHH Đầu tư và phát triển thương mại Chamy chính thức thành lập.</p>
        <p>Từ những năm đầu thành lập với số lượng nhân viên ít ỏi, đến nay công ty đã tạo hơn 160 việc làm trực tiếp và hơn 200 việc làm gián tiếp trên toàn quốc.</p>
        <p>Tính đến nay Chamy đã có hệ thống 7 cửa hàng trên toàn quốc.</p>
        <p><strong>TẦM NHÌN:</strong></p>
        <p>Đến năm 2030 trở thành thương hiệu thời trang cao cấp uy tín hàng đầu Việt Nam với hơn 100 cửa hàng, 1000 nhân sự toàn quốc.</p>
        <p><strong>SỨ MỆNH:</strong></p>
        <ul>
          <li>Trở thành một thương hiệu thời trang cao cấp, mang đến cho khách hàng những trải nghiệm mới không ở đâu có được</li>
          <li>Phát triển con người là tiêu chí hàng đầu đánh giá thành công của CHAMY</li>
        </ul>
        <p><strong>GIÁ TRỊ CỐT LÕI:</strong></p>
        <ul>
          <li><strong>Học hỏi:</strong> Chủ động học tập và tự hoàn thiện bản thân. Hành động quyết liệt và tin tưởng sẽ đạt mục tiêu.</li>
          <li><strong>Chân thành:</strong> Thành thật quan tâm đến đồng đội, sẵn lòng hỗ trợ đồng đội, hướng dẫn, động viên để họ hoàn thành tốt công việc. Không làm thay, không bao che.</li>
          <li><strong>Kỷ luật:</strong> Nói gì làm đó. Làm đúng và đủ quy trình những nội dung đã cam kết, không làm dối, làm tắt. Tự nhận trách nhiệm và giải quyết hậu quả khi không giữ lời.</li>
          <li><strong>Tử tế:</strong> Sống biết ơn trung thực, đề cao những giá trị đạo đức. Không lấy, không sở hữu, không nghĩ đến việc chiếm hữu tiền bạc, tài sản, hàng hóa không phải của mình.</li>
          <li><strong>Sáng tạo:</strong> Luôn tìm tòi và sẵn sàng thử nghiệm phương pháp mới, chấp nhận thất bại, rút kinh nghiệm và tiếp tục hành động để đạt được thành công.</li>
        </ul>
        <p>Chúng tôi tin rằng với đội ngũ chuyên gia giàu kinh nghiệm, am hiểu sâu về lĩnh vực thời trang và có tinh thần trách nhiệm trong công việc sẽ là yếu tố quan trọng của sự thành công.</p>
        <h3>NHỮNG ƯU THẾ KHI LÀM VIỆC TẠI CHAMY GABY</h3>
        <p><strong>Thu nhập khủng:</strong> Thưởng cá nhân xuất sắc, thưởng theo đội nhóm, thưởng theo kết quả kinh doanh của công ty. Thưởng tháng lương thứ 13, thưởng lễ tết,...</p>
        <p><strong>Đào tạo phát triển:</strong> Đào tạo nội bộ các kỹ năng mềm, kỹ năng, chuyên môn làm việc hàng tháng; được cử đi đào tạo nâng cao chuyên môn.</p>
        <p><strong>Môi trường làm việc:</strong> Năng động, thân thiện, sáng tạo và kích thích khả năng phát triển cá nhân cao.</p>
        <p><strong>Các chế độ theo luật định:</strong> Đóng bảo hiểm, tuân thủ các chế độ theo Luật lao động hiện hành.</p>
        <p><strong>Hoạt động khác:</strong> Được tham dự các sự kiện hay và ý nghĩa; du lịch trong nước, team building,...</p>
        <h3>THÔNG TIN CÔNG TY</h3>
        <p><strong>Chức danh công việc:</strong> Nhân viên Chăm sóc khách hàng</p>
        <p><strong>Số lượng:</strong> 04 người</p>
        <p><strong>Loại hình công việc:</strong> Toàn thời gian (Fulltime)</p>
        <p><strong>Thu nhập:</strong> 10.000.000 VNĐ – 12.000.000 VNĐ</p>
        <p><strong>Page công ty:</strong> <a href="https://www.facebook.com/Chamytd">https://www.facebook.com/Chamytd</a></p>
        <p><strong>Địa điểm làm việc:</strong> 5N7 TT5 KĐT Bắc Linh Đàm, Đặng Xuân Bảng, Đại Kim, Hoàng Mai, HN</p>
        <h3>MÔ TẢ CÔNG VIỆC</h3>
        <p><strong>Nhiệm vụ, trách nhiệm chính:</strong></p>
        <ul>
          <li>Tiến hành chăm sóc, khai thác khách hàng từ Data công ty cung cấp.</li>
          <li>Chăm sóc, duy trì phát triển quan hệ với khách hàng cũ để tạo doanh thu quay lại.</li>
          <li>Chia sẻ, tư vấn cho khách hàng về sản phẩm, dịch vụ, chất liệu và báo giá.</li>
          <li>Phối hợp với các bộ phận có liên quan để xử lý, giải quyết các vấn đề gặp phải trong quá trình tư vấn và bán hàng.</li>
        </ul>
        <h3>YÊU CẦU</h3>
        <p><strong>Công cụ làm việc:</strong> Có laptop để làm việc.</p>
        <p><strong>Kinh nghiệm:</strong></p>
        <ul>
          <li>Giọng nói dễ nghe, không nói ngọng.</li>
          <li>Kinh nghiệm: Từ 6 tháng trở lên trong mảng thời trang là một lợi thế.</li>
          <li>Giới tính: Nữ.</li>
          <li>Hoạt ngôn, năng động.</li>
          <li>Có gu thẩm mỹ và biết mix-match đồ.</li>
        </ul>
        <p><strong>Kỹ năng:</strong></p>
        <ul>
          <li>Kỹ năng giao tiếp.</li>
          <li>Kỹ năng làm việc nhóm.</li>
        </ul>
        <p><strong>Thái độ/ tính cách:</strong></p>
        <ul>
          <li>Nhanh nhẹn, linh hoạt.</li>
          <li>Thẳng thắn, trung thực.</li>
          <li>Thân thiện, hoạt ngôn.</li>
        </ul>
        <h3>CÁC CHÍNH SÁCH KHÁC</h3>
        <p><strong>Mức lương:</strong> Thu nhập: 8.000.000 - 12.000.000 VNĐ/tháng</p>
        <p><strong>Thời gian làm việc:</strong></p>
        <ul>
          <li>8h-17h, từ T2 – T7.</li>
          <li>Đáp ứng tăng ca được.</li>
        </ul>
        <p><strong>Quyền lợi:</strong></p>
        <ul>
          <li>Con đường công danh luôn rõ ràng tại Chamy: Nhân viên – Chuyên viên – Chuyên viên cao cấp - Trưởng nhóm – Trưởng bộ phận – Giám đốc chuyên môn.</li>
          <li>Thưởng tháng lương thứ 13.</li>
          <li>Du lịch, nghỉ mát, team building, Year End Party…</li>
          <li>Nghỉ lễ theo lịch quốc gia & thưởng nóng (Tết dương lịch, 8/3, 30/4, 1/5,…).</li>
          <li>Được chiết khấu khi mua các sản phẩm thời trang mang thương hiệu Chamy.</li>
        </ul>
        <h3>CÁCH THỨC ỨNG TUYỂN</h3>
        <p>Ứng viên gửi CV bản mềm qua email: <a href="mailto:quynhdung.hr@chamy.com.vn">quynhdung.hr@chamy.com.vn</a></p>
        <p>Tiêu đề: “Họ và tên – Vị trí”</p>
        <p>Thông tin cần được hỗ trợ, vui lòng gọi hotline: <a href="tel:0983531552">0983531552</a></p>
      `
    },
    '6': {
      title: 'Quản lý kinh doanh',
      date: '02/07/2024 02:05 PM',
      views: 249,
      description: `
        <p><strong>QUẢN LÝ KINH DOANH</strong></p>
        <p>Chamy Gaby là thương hiệu thời trang nữ đẳng cấp, sản phẩm là các thiết kế vô cùng đa dạng, sử dụng linh hoạt được trong các hoàn cảnh khác nhau, thương hiệu đã đi sâu vào lòng khách hàng. Các thiết kế vừa đặc sắc vừa đặt chất lượng lên hàng đầu, chúng tôi không chỉ mang đến phong cách mà còn thể hiện sự tự tin và cá nhân hóa cho phụ nữ hiện đại.</p>
        <p>Chamy Gaby - Thấu hiểu mong muốn phái đẹp, chúng tôi luôn đồng hành và lấy khách hàng làm trọng tâm. Thấu hiểu những tâm tư, tình cảm của tất cả chị em phụ nữ, những mong muốn hạnh phúc gia đình trọn vẹn và thành công trong sự nghiệp, chúng ta có thể chọn cả 2, Chamy Gaby sẵn sàng đồng hành cùng quý khách hàng trên con đường đó.</p>
        <h3>Thông tin về chúng tôi:</h3>
        <p><strong>LỊCH SỬ HÌNH THÀNH:</strong></p>
        <p>Nhen nhóm từ đầu năm 2020, đến ngày 17/04/2021 Công ty TNHH Đầu tư và phát triển thương mại Chamy chính thức thành lập.</p>
        <p>Từ những năm đầu thành lập với số lượng nhân viên ít ỏi, đến nay công ty đã tạo hơn 160 việc làm trực tiếp và hơn 200 việc làm gián tiếp trên toàn quốc.</p>
        <p>Tính đến nay Chamy đã có hệ thống 7 cửa hàng trên toàn quốc.</p>
        <p><strong>TẦM NHÌN:</strong></p>
        <p>Đến năm 2030 trở thành thương hiệu thời trang cao cấp uy tín hàng đầu Việt Nam với hơn 100 cửa hàng, 1000 nhân sự toàn quốc.</p>
        <p><strong>SỨ MỆNH:</strong></p>
        <ul>
          <li>Trở thành một thương hiệu thời trang cao cấp, mang đến cho khách hàng những trải nghiệm mới không ở đâu có được</li>
          <li>Phát triển con người là tiêu chí hàng đầu đánh giá thành công của CHAMY</li>
        </ul>
        <p><strong>GIÁ TRỊ CỐT LÕI:</strong></p>
        <ul>
          <li><strong>Học hỏi:</strong> Chủ động học tập và tự hoàn thiện bản thân. Hành động quyết liệt và tin tưởng sẽ đạt mục tiêu.</li>
          <li><strong>Chân thành:</strong> Thành thật quan tâm đến đồng đội, sẵn lòng hỗ trợ đồng đội, hướng dẫn, động viên để họ hoàn thành tốt công việc. Không làm thay, không bao che.</li>
          <li><strong>Kỷ luật:</strong> Nói gì làm đó. Làm đúng và đủ quy trình những nội dung đã cam kết, không làm dối, làm tắt. Tự nhận trách nhiệm và giải quyết hậu quả khi không giữ lời.</li>
          <li><strong>Tử tế:</strong> Sống biết ơn trung thực, đề cao những giá trị đạo đức. Không lấy, không sở hữu, không nghĩ đến việc chiếm hữu tiền bạc, tài sản, hàng hóa không phải của mình.</li>
          <li><strong>Sáng tạo:</strong> Luôn tìm tòi và sẵn sàng thử nghiệm phương pháp mới, chấp nhận thất bại, rút kinh nghiệm và tiếp tục hành động để đạt được thành công.</li>
        </ul>
        <p>Chúng tôi tin rằng với đội ngũ chuyên gia giàu kinh nghiệm, am hiểu sâu về lĩnh vực thời trang và có tinh thần trách nhiệm trong công việc sẽ là yếu tố quan trọng của sự thành công.</p>
        <h3>NHỮNG ƯU THẾ KHI LÀM VIỆC TẠI CHAMY GABY</h3>
        <p><strong>Thu nhập khủng:</strong> Thưởng cá nhân xuất sắc, thưởng theo đội nhóm, thưởng theo kết quả kinh doanh của công ty. Thưởng tháng lương thứ 13, thưởng lễ tết,...</p>
        <p><strong>Đào tạo phát triển:</strong> Đào tạo nội bộ các kỹ năng mềm, kỹ năng, chuyên môn làm việc hàng tháng; được cử đi đào tạo nâng cao chuyên môn.</p>
        <p><strong>Môi trường làm việc:</strong> Năng động, thân thiện, sáng tạo và kích thích khả năng phát triển cá nhân cao.</p>
        <p><strong>Các chế độ theo luật định:</strong> Đóng bảo hiểm, tuân thủ các chế độ theo Luật lao động hiện hành.</p>
        <p><strong>Hoạt động khác:</strong> Được tham dự các sự kiện hay và ý nghĩa; du lịch trong nước, team building,...</p>
        <h3>THÔNG TIN CÔNG TY</h3>
        <p><strong>Chức danh công việc:</strong> Quản lý kinh doanh</p>
        <p><strong>Số lượng:</strong> 01 người</p>
        <p><strong>Loại hình công việc:</strong> Toàn thời gian (Fulltime)</p>
        <p><strong>Thu nhập:</strong> 25.000.000 VNĐ – 30.000.000 VNĐ</p>
        <p><strong>Web công ty:</strong> <a href="https://chamygaby.vn/tuyen-dung">https://chamygaby.vn/tuyen-dung</a></p>
        <p><strong>Page công ty:</strong> <a href="https://www.facebook.com/Chamytd">https://www.facebook.com/Chamytd</a></p>
        <p><strong>Địa điểm làm việc:</strong> 5N7 TT5 KĐT Bắc Linh Đàm, Đặng Xuân Bảng, Đại Kim, Hoàng Mai, HN</p>
        <h3>MÔ TẢ CÔNG VIỆC</h3>
        <p><strong>Nhiệm vụ, trách nhiệm chính:</strong></p>
        <ul>
          <li>Tham mưu cho Ban giám đốc về chiến lược kinh doanh của nhãn hàng.</li>
          <li>Xây dựng và triển khai lập kế hoạch kinh doanh của nhãn hàng, bám sát kế hoạch kinh doanh, đảm bảo sự tăng trưởng của nhãn hàng.</li>
          <li>Điều hành và quản lý vận hành các khối kinh doanh cửa hàng và khối kinh doanh online.</li>
          <li>Quy hoạch, tổ chức sắp xếp nhân sự, quản lý và điều hành toàn bộ công việc của các bộ phận/vị trí trong phòng kinh doanh.</li>
          <li>Đào tạo sale chốt đơn online.</li>
          <li>Đưa ra các chính sách bán hàng, các chương trình bán tăng tỷ lệ chốt đơn.</li>
          <li>Đo lường chỉ số phòng sale.</li>
        </ul>
        <h3>YÊU CẦU</h3>
        <p><strong>Học vấn:</strong> Bằng cấp: Tốt nghiệp Đại học trở lên. Chuyên ngành: Kinh tế tài chính, Quản trị kinh doanh.</p>
        <p><strong>Kinh nghiệm:</strong></p>
        <ul>
          <li>Kinh nghiệm: >= 2 năm kinh nghiệm làm việc trong các lĩnh vực liên quan.</li>
          <li>Thành thạo tin học văn phòng.</li>
          <li>Giới tính: Nữ.</li>
        </ul>
        <p><strong>Kỹ năng:</strong></p>
        <ul>
          <li>Kỹ năng lập kế hoạch.</li>
          <li>Kỹ năng quản lý, lãnh đạo.</li>
          <li>Kỹ năng giao tiếp.</li>
          <li>Kỹ năng quản lý thời gian.</li>
          <li>Kỹ năng giải quyết các vấn đề phát sinh.</li>
          <li>Kỹ năng giao việc và tiếp nhận công việc.</li>
        </ul>
        <p><strong>Thái độ/ tính cách:</strong></p>
        <ul>
          <li>Nhanh nhẹn, linh hoạt.</li>
          <li>Thẳng thắn, trung thực.</li>
          <li>Thân thiện, hoạt ngôn.</li>
        </ul>
        <h3>CÁC CHÍNH SÁCH KHÁC</h3>
        <p><strong>Mức lương:</strong> Thu nhập: 25.000.000 - 30.000.000 VNĐ/tháng</p>
        <p><strong>Thời gian làm việc:</strong> 8h-17h, Từ T2 – T7</p>
        <p><strong>Quyền lợi:</strong></p>
        <ul>
          <li>Cơ hội thăng tiến lên cấp Giám đốc kinh doanh.</li>
          <li>Thưởng tháng lương thứ 13.</li>
          <li>Du lịch, nghỉ mát, team building, Year End Party…</li>
          <li>Nghỉ lễ theo lịch quốc gia & thưởng nóng (Tết dương lịch, 8/3, 30/4, 1/5,…).</li>
          <li>Được chiết khấu khi mua các sản phẩm thời trang mang thương hiệu Chamy.</li>
        </ul>
        <h3>CÁCH THỨC ỨNG TUYỂN</h3>
        <p>Ứng viên gửi CV bản mềm qua email: <a href="mailto:quynhdung.hr@chamy.com.vn">quynhdung.hr@chamy.com.vn</a></p>
        <p>Tiêu đề: “Họ và tên – Vị trí”</p>
        <p>Thông tin cần được hỗ trợ, vui lòng gọi hotline: <a href="tel:0983531552">0983531552</a></p>
      `
    }
  };

  // Danh sách bài viết khác
  relatedJobs = [
    { id: '1', title: 'Nhân viên Facebook Ads', date: '16/07/2024' },
    { id: '2', title: 'Nhân viên bán hàng', date: '09/07/2024' },
    { id: '3', title: 'Trưởng phòng Marketing', date: '09/07/2024' },
    { id: '4', title: 'Nhân viên Sale Online', date: '02/07/2024' },
    { id: '5', title: 'Nhân viên Chăm sóc khách hàng', date: '02/07/2024' },
    { id: '6', title: 'Quản lý kinh doanh', date: '02/07/2024' }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.jobId = this.route.snapshot.paramMap.get('id');
  }

  toggleMenu() {
    if (isPlatformBrowser(this.platformId)) {
      const navbarElement = this.navbar.nativeElement;
      navbarElement.classList.toggle('active');
    }
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
      if (isPlatformBrowser(this.platformId)) {
        alert('Vui lòng nhập từ khóa tìm kiếm!');
      }
    }
  }

  onSearchChange() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
    }
  }
}
