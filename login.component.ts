import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CustomerService } from '../services/customer.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSignin: boolean;
  constructor(private formBuilder: FormBuilder, private route: Router,private custService : CustomerService) {


  this.loginForm = this.formBuilder.group({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
      //CustomEmailValidator.uniqueEmailId
      Validators.email
      //Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
    ], this.custService.emailExisted()),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      Validators.pattern("(?=(.*[A-Za-z0-9]){3})(?=(.*[A-Z]){3})(?=(.*[a-z]){3})(?=(.*[0-9]))(?=(.*[@#])).+")])

  });
}
  ngOnInit(): void {
  }

  get password(){
    return this.loginForm.controls.password;
  }
  get email(){
    return this.loginForm.controls.email;
  }
  onSignin(data){
    this.isSignin =true;
    if(data.email=="user123@gmail.com" && data.password=="user123"){

        alert("Signin Successful");
        this.route.navigate(['/customer-details'])

    }
    else{
      this.isSignin = false;
      alert("Invalid credentials or create an account");

    }

  }
  onSignUp(data){
    if(data.email=="" && data.password == "")
      this.route.navigate(['/signup']);
  }
  get disableSignin(){
    return this.isSignin = false;
  }
  get disableSignUp(){
    return this.isSignin = false;
  }

}
