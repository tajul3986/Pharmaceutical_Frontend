import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {


  constructor(private httpClient:HttpClient, private router: Router, private userService : UserService) { }

  ngOnInit(): void {
  }

  
}
