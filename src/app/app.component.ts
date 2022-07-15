import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { User } from './common/user.interface';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  public users: Array<User> = [];
  public renderedUsers: Array<User> = [];
  private count: number = 12;
  private total: Array<User> = [];

  @ViewChild('container') container!: ElementRef;

  constructor(private userService: UserService) {}
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
   this.getUsers()
  }

  private getUsers() {
    this.userService.getUsers().subscribe(res => {
      this.total = res;
      for (let i = 0; i <= this.count; i++) {
        this.users.push(res[i]);
      }
      this.total = this.total.filter(el => !this.users.includes(el));
    });
  }
}
