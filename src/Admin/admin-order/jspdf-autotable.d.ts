// Thêm ở đầu file admin-order.component.ts
declare module 'jspdf' {
    interface jsPDF {
      lastAutoTable?: {
        finalY: number;
      };
    }
  }
  