import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { HotToastService } from '@ngneat/hot-toast';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user.model';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss'],
})
export class CreateRegistrationComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private activatedRouter: ActivatedRoute,
    private toastService: HotToastService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.formInit();
    this.calculateBmiResult();
    this.fillUserForm();
  }

  ///Decoration///
  registererForm!: FormGroup;
  packages = ['Monthly', 'Quarterly', 'Yearly'];
  gender = ['Men', 'Women'];
  goalsList: string[] = [
    'Toxic Fat reduction',
    'Energy and Endurance',
    'Building Lean Muscle',
    'Healthier Digestive System',
    'Sugar Craving Body',
    'Fitness',
  ];
  userId!: number;
  editMode: boolean = false;

  ///Methods///
  formInit() {
    this.registererForm = this.fb.group({
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]],
      gender: ['',[Validators.required]],
      package: ['',[Validators.required]],
      goal: ['',[Validators.required]],
      mobile: ['',[Validators.required]],
      weight: ['',[Validators.required,Validators.max(180),Validators.min(40)]],
      height: ['',[Validators.required,Validators.max(2.2)]],
      bmi: ['',[Validators.required]],
      bmiResult: ['',[Validators.required]],
      requireTrainer: ['',[Validators.required]],
      haveGymBefore: ['',[Validators.required]],
      enquiryDate: ['',[Validators.required]],
    });
  }
  onSubmit() {
    if (this.registererForm.valid) {
      this.api.postRegistration(this.registererForm.value).subscribe((res) => {
        this.toastService.success('Success enquire');
        this.registererForm.reset();
      });
    }
  }

  calculateBmi(hightValue: number) {
    const weight = this.registererForm.value.weight;
    const hight = hightValue;
    const bmi = weight / (hight * hight);
    this.registererForm.controls['bmi'].patchValue(bmi);
    switch (true) {
      case bmi > 10 && bmi < 18.5:
        this.registererForm.controls['bmiResult'].patchValue('Under Wight');
        break;
      case bmi >= 18.5 && bmi < 25:
        this.registererForm.controls['bmiResult'].patchValue('Normal');
        break;
      case bmi >= 25:
        this.registererForm.controls['bmiResult'].patchValue('Over Wight');
        break;
      default:
        this.registererForm.controls['bmiResult'].patchValue('😅 لا تسوقها ');
        break;
    }
  }

  calculateBmiResult() {
    this.registererForm.controls['height'].valueChanges.subscribe((res) => {
      this.calculateBmi(res);
    });
  }

  fillUserForm() {
    this.activatedRouter.params.subscribe((val) => {
      this.userId = val['id'];
      if (this.userId) {
        this.editMode = true;
        this.api.getRegisteredUserId(this.userId).subscribe({
          next: (res) => {
            this.formValues(res);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  formValues(user: User) {
    this.registererForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      weight: user.weight,
      height: user.height,
      bmi: user.bmi,
      bmiResult: user.bmiResult,
      gender: user.gender,
      requireTrainer: user.requireTrainer,
      package: user.package,
      goal: user.goal,
      haveGymBefore: user.haveGymBefore,
      enquiryDate: user.enquiryDate,
    });
  }
  update() {
    this.api
      .updateRegisterUser(this.registererForm.value, this.userId)
      .subscribe((res) => {
        this.toastService.success('Success enquire');
        this.router.navigate(['list']);
      });
  }
}
