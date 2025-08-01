import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Invoice } from 'src/app/model/invoice.model';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

 order: any;

  constructor(private route: ActivatedRoute) {}


  ngOnInit(): void {
  const latestOrder = localStorage.getItem('latestOrder');
  if (latestOrder) {
    this.order = JSON.parse(latestOrder);
     }
  }

  printInvoice() {
    window.print();
  }


// constructor(private route: ActivatedRoute) {}
// order!: Invoice;

//   ngOnInit(): void {
//     const latestOrder = localStorage.getItem('latestOrder');
//     if (latestOrder) {
//       this.order = JSON.parse(latestOrder);
//     }
//   }

//   printInvoice() {
//     window.print();
//   }
//  downloadPDF() {
//     const data = document.getElementById('invoice');
//     if (data) {
//       html2canvas(data).then((canvas) => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF('p', 'mm', 'a4');
//         const imgProps = pdf.getImageProperties(imgData);
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//         pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//         pdf.save(`Invoice-${this.order.orderCode}.pdf`);
//       });
//     }
//   }



// order!: Invoice;

//   constructor(private route: ActivatedRoute) {}

//   ngOnInit(): void {
//     const latestOrder = localStorage.getItem('latestOrder');
//     console.log('📦 Loaded from localStorage:', latestOrder); // 🐞 Check this in console

//     if (latestOrder) {
//       this.order = JSON.parse(latestOrder);
//       console.log('✅ Parsed Order:', this.order); // 🐞 Check name, phone, etc.
      
//     } else {
//       console.warn('⚠️ No latestOrder found in localStorage');
//     }
//   }

//   printInvoice() {
//     window.print();
//   }

//   downloadPDF() {
//     const data = document.getElementById('invoice');
//     if (data) {
//       html2canvas(data).then((canvas) => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF('p', 'mm', 'a4');
//         const imgProps = pdf.getImageProperties(imgData);
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//         pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//         pdf.save(`Invoice-${this.order.orderCode}.pdf`);
//       });
//     }
//   }

}
