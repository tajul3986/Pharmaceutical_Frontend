import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users: any;

 constructor(private userService : UserService, private route : Router ) { }

  ngOnInit(): void {
  }

  loginUser(user : User) {

   this.userService.loginUser(user).subscribe(
      (loggedUser) => {
        localStorage.removeItem("currentuser");
        localStorage.setItem("currentuser", loggedUser.username);
        console.log(localStorage.getItem("currentuser"))

        Swal.fire({
            // position: "top-end",
            icon: "success",
            title: "Login Successfull",
            showConfirmButton: false,
            timer: 1500
          });
        this.route.navigate(['admin']);
      },
      (error) => {
        alert("Not Logged In");
      }
    );
  }

}
