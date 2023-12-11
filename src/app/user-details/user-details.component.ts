import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { map, pipe } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  userId!: number;
  userDetail!: User;
  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.userId = data['id'];
      this.fetchUserData(this.userId);
    });
  }
  fetchUserData(userId: number) {
    this.api.getRegisteredUserId(userId).subscribe((data) => {
      console.log(data, 'user id :', userId);
      this.userDetail = data;
    });
  }
}
