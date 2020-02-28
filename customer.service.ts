import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EbankApiService } from '../core/services/ebank-api.service';
import { CustomerData } from '../customer-details/customer-interface';
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CustomerService {

  constructor(private  http: HttpClient, private ebankApi: EbankApiService) { }

  emailExisted() :AsyncValidatorFn{

    return (control : AbstractControl) : Observable<ValidationErrors | null> =>{
                    return this.emailIdValidator(control.value).pipe(
                    map(result =>{

                            return  result ? {"Email Exists" : true} : null;
                    })
                  );
    }
  }

  emailIdValidator(emailid: string){
    return this.ebankApi.get('/Customer/GetDetails' + emailid);
  }
  saveCustomer(data : CustomerData){
    return this.ebankApi.post('/Customer/Save' , data);
  }
}
