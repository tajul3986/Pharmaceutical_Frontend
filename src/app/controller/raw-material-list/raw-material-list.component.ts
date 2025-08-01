import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RawMaterial } from 'src/app/model/raw.model';
import { RawMaterialService } from 'src/app/services/raw-material.service';

@Component({
  selector: 'app-raw-material-list',
  templateUrl: './raw-material-list.component.html',
  styleUrls: ['./raw-material-list.component.css']
})
export class RawMaterialListComponent implements OnInit {

  constructor(private rawMaterialService : RawMaterialService, private route : Router) { }

  products : RawMaterial | any;
  raw  : RawMaterial | any;
  ngOnInit() {
    this.getAll();
  }

  divStatus = false;
  editRaw(raw : RawMaterial){
    this.divStatus =  true;
    this.rawMaterialService.editRaw(raw).subscribe(
      (response) => {
        this.raw = response;
      }
    );
  }
  updateRaw(raw : RawMaterial){
    this.divStatus = false;
    console.log(raw + "...");
    this.rawMaterialService.updateRaw(raw);
    this.getAll();
    this.route.navigate(['/admin/rawlist']);
  }
  deleteRaw(raw : RawMaterial){
    this.rawMaterialService.deleteRaw(raw);
    alert("Data deleted");
  }
  
  getAll(){
    this.rawMaterialService.getAll().subscribe(
      (response) => {
        this.products = response;
      }
    );
  }

}
