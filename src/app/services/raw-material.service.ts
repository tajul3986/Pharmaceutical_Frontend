import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RawMaterial } from '../model/raw.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RawMaterialService {

  url : string = "http://localhost:8080/pharma/rawmaterial";
  // url : string = "http://localhost:3000/raw";

  constructor(private http : HttpClient) { }


  addRaw(raw: RawMaterial) {      //post
    console.log(raw);
    this.http.post(this.url, raw).toPromise();
  }

  editRaw(raw : RawMaterial){
    localStorage.removeItem("id");
    // localStorage.setItem("id", raw.id.toString());
    console.log(raw);
    return this.http.get<RawMaterial>(this.url + "/" + raw.id);
  }
  updateRaw(raw : RawMaterial){
    let val = localStorage.getItem("id");
    console.log(raw);
    this.http.put(this.url + "/" + val, raw).toPromise();
  }
  deleteRaw(raw : RawMaterial){
    this.http.delete(this.url + "/" + raw.id).toPromise();
  }

  // deleteRaw(id: number): Observable<void> {
  //     return this.http.delete<void>(`${this.url}/${id}`);
  //   }

  getAll(){
    return this.http.get<RawMaterial>(this.url);
  }

}
