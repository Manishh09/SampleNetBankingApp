import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';


export class CustomEmailValidator{

    static uniqueEmailId(control : AbstractControl) : Promise<ValidationErrors | null>  {
        
        return new Promise((resolve, reject)=>{
            if(control.value ==='manish'){
                resolve({uniqueEmailId : true})
            }
            else resolve(null);

        });

    // static emailIdExisted(control: AbstractControl) : Observable<ValidationErrors | null>{

    //     return
    // }
       
    
}