import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInformation } from './../../model/userinformation';
import { AuthService } from './../../shared/auth.service';
import { User } from './../../model/user';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  users : User[];
  userInfo : UserInformation;
  currentUser: Object = {};
  user: Object = {};
  constructor(
    public http: HttpClient,
    public authService: AuthService,
    private actRoute: ActivatedRoute
  ) {
    this.userInfo = {} as UserInformation;
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(id).subscribe(res => {
      this.currentUser = res.msg;
      this.user = this.authService.getToken();
    })
  }
  ngOnInit(): void {
    this.getUserList();
  }
  getUserList() {
    this.authService
    .getUsers()
    .subscribe((data:any) => {
      console.log(data);
      this.users = data.data;
    });
  }


   /*
   get token(): any {
    return localStorage.getItem('access_token');
}
*/
}
