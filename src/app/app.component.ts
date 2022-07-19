import { Component, OnInit,} from '@angular/core';
import { fromEvent, debounceTime } from 'rxjs';
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
  private startScrollPosition: number = 0;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.handleScrollDirection();
  }

  private handleScrollDirection() {
    fromEvent(window, 'scroll').pipe(debounceTime(1500)).subscribe(_ => {
      const currentPosition = window.scrollY;
      if (currentPosition > this.startScrollPosition && currentPosition > 50) {
        window.scroll(0, 50);
        this.getNextUsers();
      } else if (currentPosition < 50) {
        this.renderedUsers = this.prevUsers;
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
