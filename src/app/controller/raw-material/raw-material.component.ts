import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RawMaterial } from 'src/app/model/raw.model';
import { RawMaterialService } from 'src/app/services/raw-material.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-raw-material',
  templateUrl: './raw-material.component.html',
  styleUrls: ['./raw-material.component.css']
})
export class RawMaterialComponent implements OnInit {

  constructor(private rawMaterialService : RawMaterialService, private route : Router) { }

  ngOnInit() {
  }

  addRaw(raw : RawMaterial){ //post
    this.rawMaterialService.addRaw(raw);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Material saved",
      showConfirmButton: false,
      timer: 1500
    });
    this.route.navigate(["/admin/rawlist"]);
  }


  // date convert mm-dd-yyyy to yyyy-mm-dd 

  

  formatDateToCustom(dateStr: string): string {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
  }


}
