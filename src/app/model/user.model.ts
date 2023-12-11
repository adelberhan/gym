export class User {
  firstName!: string;
  lastName!: string;
  email!: string;
  mobile!: number;
  weight!: number;
  height!: number;
  bmi!: number;
  bmiResult!: string;
  gender!: string;
  requireTrainer!: string;
  package!: string;
  goal!: string[];
  haveGymBefore!: string;
  enquiryDate!: string;
  id!: number;

  constructor(

    firstName: string,
    packages: string,
    lastName: string,
    email: string,
    mobile: number,
    weight: number,
    height: number,
    bmi: number,
    bmiResult: string,
    gender: string,
    requireTrainer: string,
    goal: string[],
    haveGymBefore: string,
    enquiryDate: string,
    id: number,

  ){
    this.firstName = firstName;
    this.package = packages;
    this.lastName = lastName;
    this.email = email;
    this.mobile = mobile;
    this.weight = weight;
    this.height = height;
    this.bmi = bmi;
    this.bmiResult = bmiResult;
    this.gender = gender;
    this.requireTrainer = requireTrainer;
    this.goal = goal;
    this.haveGymBefore = haveGymBefore;
    this.enquiryDate = enquiryDate;
    this.id = id;
  }
}

export class UserObt{
 user!:{};


 constructor() {
  this.user = { id: {String,User} };
}}
