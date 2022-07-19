import { Component, OnInit,} from '@angular/core';
import { takeLast, fromEvent, of, Subscription } from 'rxjs';
import { User } from './common/user.interface';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public renderedUsers: Array<User> = [];
  private total: Array<User> = [];
  private restUsers: Array<User> = [];
  private prevUsers: Array<User> = [];
  private count: number = 12;
  scroll$: Subscription | undefined;
  startPosition: number = 0;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.handleScrollDirection();
  }

  private handleScrollDirection() {
    this.startPosition = window.scrollY;
    this.scroll$ = fromEvent(window, 'scroll').subscribe(_ => {
      if (window.scrollY) {
        window.scroll(0, 0);
        this.getNextUsers();
      }  
    });
  }


  private getUsers() {
    this.userService.getUsers().subscribe((res) => {
      this.total = res;
      for (let i = 0; i <= this.count; i++) {
        this.renderedUsers.push(res[i]);
      }
      this.restUsers = this.total.filter(el => !this.renderedUsers.includes(el)
      );
      this.count = 12;
    });
  }

  private getNextUsers() {
    this.prevUsers = this.renderedUsers;
    this.renderedUsers = [];
      for (let i = 0; i < this.count; i++) {
        this.renderedUsers.push(this.restUsers[i]);
      this.restUsers = this.restUsers.filter(el => !this.renderedUsers.includes(el));
    }
  }  
}
