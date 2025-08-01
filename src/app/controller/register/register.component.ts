import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
// username: any;
// name: any;
// email: any;
// password: any;
// confirmpassword: any;



  constructor(private userService : UserService, private router : Router) { }

  ngOnInit(): void {
  }

  registerUser(user : User) {
    //console.log("hello")
    this.userService.registerUser(user);

    Swal.fire({
      title: "Good job!",
      text: "Registration Successfull!",
      icon: "success"
    });

    //alert("Registration Successfull");
    this.router.navigate(['login']);

    
}

}
