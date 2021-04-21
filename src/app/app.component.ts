import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { promise } from 'selenium-webdriver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna']
 
  constructor(private fb: FormBuilder){}

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username':new FormControl(null,[Validators.required,this.forbiddenNames.bind(this)]),
        'email':new FormControl(null,[Validators.required,Validators.email],this.forbiddenEmails),
      }),
      'genders': new FormControl('male'),
      'hobbies': new FormArray([])
    })

   // listen status and value of your form 
    // this.signupForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );
    this.signupForm.statusChanges.subscribe(
      (status) => console.log(status)
    );

    this.signupForm.setValue({
      'userData':{
        'username':'Max',
        'email':'test@test.com'
      },
      'genders':'male',
      'hobbies':[]
    });
    this.signupForm.patchValue({
      'userData':{
        'username':'Anna'
      }
    })
  }
  onSubmit(){
    console.log(this.signupForm);
    this.signupForm.reset();
  }
  addHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }
  forbiddenNames(control:FormControl):{[s:string]:boolean}{
    if(this.forbiddenUsernames.indexOf(control.value) !== -1){
      return {'nameIsForbidden':true};
    }
    return null;
  }

  forbiddenEmails(control:FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) =>{
      setTimeout(() =>{
        if(control.value === 'test@test.com'){
          resolve({
            'emailIsForbidden': true
          });
        }else{
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
