import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

interface PolicyDetail {
  title: string;
  date: string;
  views: number;
  description: string;
  related: { title: string; date: string; id: string }[];
}

@Component({
  selector: 'app-policy-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './policy-detail.component.html',
  styleUrls: ['./policy-detail.component.css']
})
export class PolicyDetailComponent implements OnInit {
  policyId: string | null = null;
  policyDetails: Record<string, PolicyDetail> = {
    'terms': {
      title: 'Điều khoản và quy định chung',
      date: '04/06/2024 09:57 AM',
      views: 240,
      description: `
        <h2>Chấp nhận điều khoản:</h2>
        <p>Khi bạn truy cập và sử dụng website của chúng tôi, điều này đồng nghĩa với việc bạn đã đồng ý và tuân thủ các điều khoản và quy định được nêu trong tài liệu này. Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng không tiếp tục sử dụng dịch vụ của chúng tôi.</p>
        <h2>Quyền Sở Hữu Trí Tuệ</h2>
        <p>Tất cả nội dung trên trang web, bao gồm nhưng không giới hạn các hình ảnh, văn bản, biểu đồ, biểu mẫu, logo, và dấu hiệu thương hiệu là tài sản của chúng tôi hoặc các bên thứ ba đã cấp phép. Việc sử dụng, sao chép, phân phối hay tái sản xuất nội dung này mà không có sự đồng ý bằng văn bản từ chúng tôi là vi phạm quyền sở hữu trí tuệ.</p>
        <h2>Thông tin sản phẩm và giá cả</h2>
        <p>Chúng tôi cam kết cung cấp thông tin chính xác và đầy đủ về các sản phẩm mà chúng tôi cung cấp. Tuy nhiên, chúng tôi không chịu trách nhiệm đối với bất kỳ sai sót hoặc thiếu sót nào trong thông tin sản phẩm, chúng tôi có quyền thay đổi giá cả mà không cần thông báo trước. Bạn nên kiểm tra kỹ thông tin sản phẩm trước khi đặt mua.</p>
        <h2>Quyền và trách nhiệm của người dùng</h2>
        <p>Khi sử dụng dịch vụ của chúng tôi, bạn cam kết cung cấp thông tin chính xác và tuân thủ các quy định và điều khoản được đề ra. Bạn chịu trách nhiệm đối với hoạt động của mình trên website và không được sử dụng dịch vụ của chúng tôi cho mục đích bất hợp pháp hoặc gây hại đến người khác.</p>
        <h2>Thay Đổi Điều Khoản</h2>
        <p>Chúng tôi có quyền thay đổi các điều khoản và quy định này mà không cần thông báo trước. Việc sử dụng tiếp tục của bạn sau các thay đổi này sẽ đồng nghĩa với việc bạn chấp nhận những thay đổi đó.</p>
        <h2>Liên Hệ</h2>
        <p>Nếu bạn có bất kỳ câu hỏi hoặc ý kiến về Điều Khoản và Quy Định Chung này, vui lòng liên hệ với chúng tôi qua thông tin liên hệ được cung cấp trên trang web.</p>
      `,
      related: [
        { title: 'Chính sách bảo mật thông tin', date: '04/06/2024', id: 'privacy' },
        { title: 'Phương thức thanh toán', date: '02/07/2024', id: 'payment' },
        { title: 'Chính sách vận chuyển và kiểm hàng', date: '02/07/2024', id: 'shipping' },
        { title: 'Chính sách bảo hành và đổi trả', date: '02/07/2024', id: 'warranty' }
      ]
    },
    'privacy': {
      title: 'Chính sách bảo mật thông tin',
      date: '04/06/2024 09:57 AM',
      views: 191,
      description: `
        <p>Trước khi tiến hành đặt hàng hoặc sử dụng dịch vụ, bạn bắt buộc phải đồng ý với chính sách Bảo vệ thông tin cá nhân của chúng tôi. Để đảm bảo an toàn và bảo vệ thông tin cá nhân của bạn, vui lòng đọc kỹ và đồng ý với các chính sách bảo mật thông tin dưới đây:</p>
        <h2>Mục đích thu thập thông tin cá nhân</h2>
        <p>Chúng tôi chỉ thu thập thông tin cá nhân của khách hàng với mục đích sau đây:</p>
        <ul>
          <li><strong>Xác nhận danh tính:</strong> Chúng tôi có thể yêu cầu thông tin cá nhân như tên, địa chỉ, số điện thoại và địa chỉ email để xác nhận danh tính của khách hàng và đảm bảo tính chính xác trong quá trình giao dịch và cung cấp dịch vụ.</li>
          <li><strong>Xử lý đơn hàng:</strong> Chúng tôi thu thập thông tin cá nhân như địa chỉ giao hàng và thông tin thanh toán để xử lý đơn hàng của khách hàng và giao hàng đến đúng địa chỉ.</li>
          <li><strong>Cải thiện trải nghiệm khách hàng:</strong> Thông tin cá nhân được sử dụng để cung cấp dịch vụ tốt hơn cho khách hàng, bao gồm hỗ trợ khách hàng, tư vấn sản phẩm và cung cấp thông tin liên quan.</li>
          <li><strong>Tùy chỉnh trải nghiệm:</strong> Chúng tôi có thể sử dụng thông tin cá nhân để tùy chỉnh và cá nhân hóa trải nghiệm mua sắm của khách hàng trên website của chúng tôi, bao gồm cung cấp thông tin sản phẩm, ưu đãi hoặc gợi ý phù hợp.</li>
        </ul>
        <h2>Phạm vi sử dụng thông tin</h2>
        <p>Chúng tôi cam kết bảo vệ thông tin cá nhân của khách hàng và chỉ sử dụng thông tin trong phạm vi cần thiết để cung cấp dịch vụ và đáp ứng yêu cầu của khách hàng. Thông tin cá nhân của khách hàng không được chia sẻ, tiết lộ hoặc bán cho bất kỳ bên thứ ba nào mà không có sự đồng ý rõ ràng từ khách hàng, trừ khi có yêu cầu pháp lý hoặc khi cần thiết để bảo vệ quyền lợi, tài sản hoặc an ninh của chúng tôi hoặc của khách hàng.</p>
        <p>Chúng tôi duy trì các biện pháp bảo mật thích hợp để đảm bảo an toàn thông tin cá nhân của khách hàng và tuân thủ các quy định về bảo vệ dữ liệu áp dụng.</p>
        <h2>Những người hoặc tổ chức có thể được tiếp cận với thông tin</h2>
        <p>Chúng tôi cam kết không chia sẻ, bán, hoặc tiết lộ thông tin cá nhân của khách hàng cho bất kỳ bên thứ ba nào ngoại trừ những trường hợp sau đây:</p>
        <ol>
          <li><strong>Đối tác dịch vụ:</strong> Chúng tôi có thể chia sẻ thông tin cá nhân với các đối tác dịch vụ hỗ trợ chúng tôi trong việc cung cấp sản phẩm và dịch vụ cho khách hàng. Tuy nhiên, các đối tác này phải tuân thủ các quy định về bảo mật thông tin và chỉ được sử dụng thông tin cá nhân cho mục đích cụ thể đã được đề ra.</li>
          <li><strong>Tuân thủ pháp luật:</strong> Chúng tôi có thể tiết lộ thông tin cá nhân khi được yêu cầu từ các cơ quan chức năng thực thi pháp luật nhằm tuân thủ các quy định, quy trình pháp lý, hoặc quyền của chúng tôi.</li>
        </ol>
        <h2>Thời gian lưu trữ thông tin</h2>
        <p>Chúng tôi sẽ lưu trữ thông tin cá nhân của khách hàng trong thời gian khách hàng sử dụng dịch vụ và cần thiết để đáp ứng mục đích thu thập thông tin đã nêu. Sau khi không còn cần thiết, chúng tôi sẽ xóa hoặc làm ẩn thông tin cá nhân của khách hàng.</p>
        <h2>Thông tin đơn vị thu thập và quản lý thông tin cá nhân</h2>
        <p>Nếu có bất kỳ câu hỏi hoặc cần hỗ trợ gì về hoạt động thu thập, xử lý thông tin liên quan đến khách hàng, xin vui lòng liên hệ trực tiếp, điện thoại hoặc email của chúng tôi theo thông tin dưới đây:</p>
        <p><strong>Tên tổ chức:</strong> CÔNG TY TNHH ĐẦU TƯ & PHÁT TRIỂN THƯƠNG MẠI CHAMY</p>
        <p><strong>Địa chỉ:</strong> Tầng 12 tòa nhà Licogi 13, số 164 Khuất Duy Tiến, Phường Nhân Chính, Quận Thanh Xuân, Thành phố Hà Nội, Việt Nam</p>
        <p><strong>Email:</strong> <a href="mailto:Ducpham.ms@gmail.com">Ducpham.ms@gmail.com</a></p>
        <p><strong>Điện thoại:</strong> <a href="tel:0978833688">0978833688</a></p>
        <h2>Quản lý dữ liệu cá nhân</h2>
        <p>Khách hàng có quyền tiếp cận và chỉnh sửa thông tin cá nhân của mình bằng cách đăng nhập vào tài khoản cá nhân trên website hoặc liên hệ với chúng tôi qua thông tin liên lạc đã được cung cấp.</p>
      `,
      related: [
        { title: 'Điều khoản và quy định chung', date: '04/06/2024', id: 'terms' },
        { title: 'Phương thức thanh toán', date: '02/07/2024', id: 'payment' },
        { title: 'Chính sách vận chuyển và kiểm hàng', date: '02/07/2024', id: 'shipping' },
        { title: 'Chính sách bảo hành và đổi trả', date: '02/07/2024', id: 'warranty' }
      ]
    },
    'payment': {
      title: 'Phương thức thanh toán',
      date: '02/07/2024 04:32 PM',
      views: 212,
      description: `
        <h2>Thanh toán khi nhận hàng</h2>
        <p>Chúng tôi cung cấp dịch vụ thanh toán khi nhận hàng, bạn có thể thanh toán bằng tiền mặt hoặc sử dụng thẻ tín dụng/tiền mặt khi nhận hàng. Đơn vị vận chuyển của chúng tôi sẽ giao hàng sau đó thu tiền tại địa chỉ bạn trong đơn hàng của bạn.</p>
      `,
      related: [
        { title: 'Điều khoản và quy định chung', date: '04/06/2024', id: 'terms' },
        { title: 'Chính sách bảo mật thông tin', date: '04/06/2024', id: 'privacy' },
        { title: 'Chính sách vận chuyển và kiểm hàng', date: '02/07/2024', id: 'shipping' },
        { title: 'Chính sách bảo hành và đổi trả', date: '02/07/2024', id: 'warranty' }
      ]
    },
    'shipping': {
      title: 'Chính sách vận chuyển và kiểm hàng',
      date: '02/07/2024 04:35 PM',
      views: 186,
      description: `
        <h2>Chính sách vận chuyển</h2>
        <ol>
          <li><strong>Phạm vi vận chuyển:</strong><br>
            Chúng tôi cung cấp dịch vụ vận chuyển đến các địa điểm khác nhau trên toàn quốc (hoặc quốc tế, tùy vào phạm vi hoạt động của chúng tôi). Trước khi hoàn tất đơn hàng, khách hàng sẽ có thể xem các địa điểm được hỗ trợ vận chuyển và có sẵn cho lựa chọn tương ứng.</li>
          <li><strong>Phương thức vận chuyển:</strong><br>
            Chúng tôi cung cấp nhiều phương thức vận chuyển để khách hàng có thể lựa chọn. Điều này bao gồm các dịch vụ vận chuyển thông thường, vận chuyển nhanh hoặc vận chuyển đặc biệt (nếu có). Thông tin chi tiết về phương thức vận chuyển và các yêu cầu kỹ thuật đi kèm sẽ được cung cấp trong quá trình đặt hàng.</li>
          <li><strong>Chi phí vận chuyển:</strong><br>
            Chi phí vận chuyển sẽ được tính toán dựa trên các yếu tố như kích thước đơn hàng, trọng lượng và địa điểm giao hàng. Trước khi hoàn tất đơn hàng, khách hàng sẽ có thể xem tổng chi phí vận chuyển và có sẵn cho xác nhận.</li>
          <li><strong>Thời gian giao hàng:</strong><br>
            Chúng tôi cam kết cung cấp thông tin về thời gian giao hàng ước tính cho khách hàng trước và trong quá trình đặt hàng. Thời gian giao hàng có thể khác nhau tùy theo địa điểm giao hàng và phương thức vận chuyển được chọn. Chúng tôi sẽ cố gắng hết sức để đảm bảo giao hàng đúng hẹn và thông báo cho khách hàng về bất kỳ sự chậm trễ nào (nếu có).</li>
          <li><strong>Trách nhiệm cung cấp chứng từ:</strong><br>
            Chúng tôi và tổ chức cung ứng dịch vụ logistics chịu trách nhiệm cung cấp các chứng từ hàng hóa cần thiết trong quá trình giao nhận. Điều này đảm bảo tính chính xác và đáng tin cậy của quá trình giao hàng.</li>
          <li><strong>Hỗ trợ khách hàng:</strong><br>
            Chúng tôi cam kết cung cấp hỗ trợ khách hàng liên quan đến vấn đề vận chuyển. Nếu khách hàng có bất kỳ câu hỏi, yêu cầu hoặc thắc mắc nào về vận chuyển, họ có thể liên hệ với đội ngũ chăm sóc khách hàng của chúng tôi để được giúp đỡ.</li>
        </ol>
        <h2>Chính sách kiểm hàng</h2>
        <ol>
          <li><strong>Kiểm tra ngoại quan sản phẩm:</strong> Quý khách được phép kiểm tra sản phẩm khi nhận hàng. Hãy kiểm tra mặt ngoại quan như mô tả đặt hàng, số lượng, màu sắc, và xem xét có bị hỏng, trầy xước, hay móp méo không.</li>
          <li><strong>Kiểm tra niêm phong:</strong> Quý khách nên kiểm tra niêm phong ngoại quan trên thùng hàng/gói hàng. Nếu dấu niêm phong bị bóc, xé hoặc không nguyên vẹn, Quý khách có quyền từ chối nhận hàng hoặc yêu cầu kiểm tra sản phẩm bên trong.</li>
          <li><strong>Đồng kiểm với nhân viên giao hàng:</strong> Nếu nhân viên giao hàng yêu cầu, Quý khách cần ký xác nhận đồng kiểm để xác nhận đã kiểm tra sản phẩm.</li>
          <li><strong>Phát hiện lỗi:</strong> Nếu Quý khách phát hiện sản phẩm không đúng hoặc có dấu hiệu lỗi, Quý khách có quyền từ chối nhận hàng.</li>
          <li><strong>Quyền hủy đơn hàng:</strong> Nếu Quý khách không hài lòng sau khi kiểm tra hàng, Quý khách có quyền hủy đơn hàng. Sau khi hủy, nếu quý khách đã thanh toán, chúng tôi sẽ hoàn tiền lại quý khách theo phương thức thanh toán quý khách đã thực hiện, thời hạn hoàn trả tối đa 07 ngày làm việc, quý khách không mất thêm chi phí cho việc hoàn tiền này.</li>
        </ol>
      `,
      related: [
        { title: 'Điều khoản và quy định chung', date: '04/06/2024', id: 'terms' },
        { title: 'Chính sách bảo mật thông tin', date: '04/06/2024', id: 'privacy' },
        { title: 'Phương thức thanh toán', date: '02/07/2024', id: 'payment' },
        { title: 'Chính sách bảo hành và đổi trả', date: '02/07/2024', id: 'warranty' }
      ]
    },
    'warranty': {
      title: 'Chính sách bảo hành và đổi trả',
      date: '02/07/2024 04:36 PM',
      views: 245,
      description: `
        <h2>Chính sách bảo hành</h2>
        <ol>
          <li><strong>Thời gian bảo hành:</strong><br>
            Chúng tôi cung cấp thời gian bảo hành cho sản phẩm hoặc dịch vụ được mua trên website của chúng tôi. Thời gian bảo hành có thể khác nhau tùy vào từng loại sản phẩm hoặc dịch vụ cụ thể. Thông tin về thời gian bảo hành cụ thể được hiển thị rõ ràng trên trang sản phẩm hoặc trang thông tin chi tiết.</li>
          <li><strong>Điều kiện bảo hành:</strong><br>
            Chúng tôi cam kết bảo hành các sản phẩm và dịch vụ trong điều kiện hợp lý và tuân thủ quy định của chúng tôi. Điều kiện bảo hành có thể bao gồm việc sử dụng đúng cách, không sửa đổi hay can thiệp vào sản phẩm, và tuân thủ các hướng dẫn bảo quản và sử dụng được cung cấp. Với những sản phẩm có tem bảo hành, chúng tôi chỉ bảo hành khi tem còn nguyên vẹn, không rách rời, chắp vá.</li>
          <li><strong>Quyền lợi của khách hàng:</strong><br>
            Trong thời gian bảo hành, khách hàng có quyền yêu cầu sửa chữa, đổi mới hoặc hoàn trả sản phẩm hoặc dịch vụ nếu phát hiện lỗi kỹ thuật hoặc vấn đề về chất lượng từ phía nhà sản xuất hoặc cung cấp dịch vụ.</li>
          <li><strong>Hỗ trợ khách hàng:</strong><br>
            Chúng tôi cam kết cung cấp hỗ trợ khách hàng tận tâm và nhanh chóng trong quá trình giải quyết các vấn đề liên quan đến bảo hành. Khách hàng có thể liên hệ với đội ngũ chăm sóc khách hàng của chúng tôi thông qua email, điện thoại hoặc trực tiếp tại văn phòng giao dịch của chúng tôi.</li>
        </ol>
        <h2>Chính sách đổi trả</h2>
        <p>Chúng tôi cam kết cung cấp chính sách hoàn trả linh hoạt và tiện lợi cho khách hàng. Dưới đây là chi tiết chính sách hoàn trả của chúng tôi:</p>
        <ol>
          <li><strong>Thời hạn hoàn trả:</strong> Khách hàng được áp dụng thời hạn hoàn trả là 3 ngày kể từ ngày nhận hàng. Để được hoàn trả, sản phẩm cần được giữ nguyên trạng thái ban đầu, không sử dụng và phải đáp ứng các điều kiện hoàn trả được quy định.</li>
          <li><strong>Phương thức hoàn trả hoặc đổi hàng:</strong> Khách hàng có thể chọn giữ lại giá trị hoàn trả dưới dạng tín dụng trong tài khoản của mình hoặc đổi lấy sản phẩm khác có giá trị tương đương. Quý khách vui lòng liên hệ với bộ phận chăm sóc khách hàng để được hỗ trợ trong quá trình hoàn trả hoặc đổi hàng.</li>
          <li><strong>Lấy lại tiền:</strong> Trong trường hợp khách hàng chọn lấy lại tiền mặt, chúng tôi sẽ thực hiện hoàn trả bằng cùng phương thức thanh toán ban đầu. Quá trình hoàn trả có thể mất một khoảng thời gian để xử lý và tiền sẽ được chuyển trả lại vào tài khoản của khách hàng.</li>
          <li><strong>Chi phí hoàn trả:</strong> Chi phí cho việc hoàn trả sản phẩm phụ thuộc vào nguyên nhân hoàn trả. Trong trường hợp sản phẩm bị lỗi do nhà sản xuất hoặc vấn đề từ phía chúng tôi, chúng tôi sẽ chịu trách nhiệm hoàn toàn cho các chi phí hoàn trả. Tuy nhiên, trong trường hợp hoàn trả do lý do cá nhân, Quý khách có thể chịu một phần hoặc toàn bộ chi phí vận chuyển và xử lý.</li>
        </ol>
        <p>Chúng tôi cam kết đảm bảo quyền lợi của khách hàng trong quá trình hoàn trả và sẵn lòng hỗ trợ Quý khách với bất kỳ vấn đề hoàn trả nào. Vui lòng liên hệ với chúng tôi qua dịch vụ chăm sóc khách hàng để biết thêm chi tiết và được hỗ trợ trong quá trình hoàn trả hàng.</p>
      `,
      related: [
        { title: 'Điều khoản và quy định chung', date: '04/06/2024', id: 'terms' },
        { title: 'Chính sách bảo mật thông tin', date: '04/06/2024', id: 'privacy' },
        { title: 'Phương thức thanh toán', date: '02/07/2024', id: 'payment' },
        { title: 'Chính sách vận chuyển và kiểm hàng', date: '02/07/2024', id: 'shipping' }
      ]
    }
  };

  constructor(
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.policyId = params['subPolicy'] || null;
      console.log('Policy ID:', this.policyId);
    });
  }

  getCurrentUrl(): string {
    if (isPlatformBrowser(this.platformId)) {
      return window.location.href;
    }
    return '';
  }

  copyLink(): void {
    if (isPlatformBrowser(this.platformId)) {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          alert('Đã sao chép liên kết!');
        })
        .catch(() => {
          alert('Không thể sao chép liên kết. Vui lòng thử lại.');
        });
    }
  }
}