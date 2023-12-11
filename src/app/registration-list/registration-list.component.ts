import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../model/user.model';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { HotToastService, Toast } from '@ngneat/hot-toast';
import { map, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss'],
})
export class RegistrationListComponent implements OnInit {
  dataSource!: MatTableDataSource<User>;
  user!: User[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns = [
    'id',
    'firstName',
    'lastName',
    'email',
    'package',
    'mobile',
    'bmiResult',
    'enquiryDate',
    'action',
  ];

  constructor(
    private api: ApiService,
    private router: Router,
    private confirm: NgConfirmService,
    private toastService: HotToastService
  ) {}
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.api
      .getRegisteredUser()
      .pipe(
        map((responseData) => {
          if (responseData === null || responseData === undefined) {
            // Handle the case where responseData is null or undefined
            // console.error('Received null or undefined data from the HTTP request.');
            return []; // Return an empty array or handle it as needed
          }

          return Object.keys(responseData).map((key) => ({
            id: key,
            ...responseData[key],
          }));
        }),
        catchError((errorRes) => {
          // Handle the error, send to analytics server, or rethrow the error
          console.error('An error occurred:', errorRes);
          return throwError(errorRes);
        })
      )
      .subscribe((res) => {
        console.log(res);
        this.user = res;
        this.dataSource = new MatTableDataSource(this.user);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(id: number) {
    this.router.navigate(['update', id]);
  }

  onDelete(id: number) {
    this.confirm.showConfirm(
      'من جدك بتلغي الإشتراك؟؟؟؟',
      () => {
        this.api.deleteRegistered(id).subscribe((res) => {
          this.toastService.success('Deleted successful');
          this.getUsers();
        });
        // console.log(id)
        // this.api.deleteRegistered(id);
        //   this.getUsers();

      },
      () => {}
    );
  }
}
