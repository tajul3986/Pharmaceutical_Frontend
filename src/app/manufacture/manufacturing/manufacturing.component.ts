import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manufacturing',
  templateUrl: './manufacturing.component.html',
  styleUrls: ['./manufacturing.component.css']
})
export class ManufacturingComponent implements OnInit {
rawMaterials: any[] = [];
requests: any[] = [];
rqstDate: any[] = [];

  manufacturingData = {   
    requestCode: '',
    rqstDate: '',
    
    items: [
      { rawMaterialId: '', quantity: null }
    ],
    
  };



  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadRawMaterials();
    this.loadRequests();
  }
 
  loadRawMaterials() {
    // this.http.get<any[]>("http://localhost:3000/raw")
    this.http.get<any[]>("http://localhost:8080/pharma/rawmaterial").subscribe(
      data => this.rawMaterials = data,
      error => console.error('Failed to load materials:', error)
    );
  }

  addItem() {
    this.manufacturingData.items.push({ rawMaterialId: '', quantity: null });
  }

  removeItem(index: number) {
    this.manufacturingData.items.splice(index, 1);
  }

  onSubmit(form: any) {
    this.http.post('http://localhost:3000/manufacture', this.manufacturingData).subscribe(
      response => {
        alert('Request sent successfully!');
        this.manufacturingData = { requestCode: '', rqstDate: '',  items: [{ rawMaterialId: '', quantity: null}] };
        form.resetForm();
      },
      error => {
        console.error('Error sending request:', error);
        alert('Failed to send request.');
      }
    );
  }


 

  loadRequests(): void {
    this.http.get<any[]>('http://localhost:3000/manufacture').subscribe(
      data => {
        this.requests = data;
      },
      error => {
        console.error('Error loading requests:', error);
      }
    );
  }

}
