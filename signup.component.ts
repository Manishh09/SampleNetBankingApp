import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerData } from '../customer-details/customer-interface';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  isSubmitted: boolean;
  apiReqest: CustomerData;
  constructor(private fb : FormBuilder, private route : Router, private custService : CustomerService) { }

  ngOnInit() {

    this.signUpForm = this.fb.group({ 
      email: new FormControl('', [  
        Validators.required,  
        Validators.minLength(8),  
        Validators.maxLength(30),  
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")  
      ]),
   
      password: new FormControl('', [  
        Validators.required,  
        Validators.minLength(7),  
        Validators.maxLength(15),  
        Validators.pattern("(?=(.*[A-Za-z0-9]){3})(?=(.*[A-Z]){3})(?=(.*[a-z]){3})(?=(.*[0-9]))(?=(.*[@#])).+")]),

      confirmPassword: new FormControl('', [  
        Validators.required,  
        Validators.minLength(7),  
        Validators.maxLength(15)  
       ])
        
    }); 
  
  }
 
  get email(){
    return this.signUpForm.controls.email;
  }
  get password(){
    return this.signUpForm.controls.password;
  }
  get confirmPassword(){
    return this.signUpForm.controls.confirmPassword;
  }  

  onSubmit(){
   
    if(this.email.valid && this.password.valid && this.confirmPassword.valid){
      
      this.apiReqest = {
        email: this.email.value,
        password : this.password.value,
        confirmpassword: this.confirmPassword.value
      }

       this.custService.saveCustomer(this.apiReqest).subscribe(
         (success)=> {
           if(success)
               this.route.navigate(['/login']);
           else 
              alert('Failed');
         },
         (error)=>{
           alert('Error');
         }       
        );        
    
    }
       
  }

}
