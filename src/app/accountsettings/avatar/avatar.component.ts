import { AuthService } from './../../api/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

    initials = '';
  constructor(public auth: AuthService) { }

  ngOnInit() {
      this.initials = this.auth.user.name.split(' ')[0].charAt(0).toUpperCase();
  }

}
