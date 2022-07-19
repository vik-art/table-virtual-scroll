import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, debounceTime, Subject, takeUntil } from 'rxjs';

import { User } from './common/user.interface';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public renderedUsers: Array<User> = [];
  private total: Array<User> = [];
  private restUsers: Array<User> = [];
  private prevUsers: Array<User> = [];
  private count: number = 15;
  private startScrollPosition: number = 0;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
    this.handleScrollDirection();
  }

  private handleScrollDirection() {
    fromEvent(window, 'scroll')
      .pipe(debounceTime(1500), takeUntil(this.destroy$))
      .subscribe(() => {
        const currentPosition = window.scrollY;
        if (currentPosition > this.startScrollPosition) {
          window.scroll(0, 100);
          console.log(currentPosition);
          this.getNextUsers();
        }
      });
  }

  private getUsers() {
    this.userService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.total = res;
        for (let i = 0; i <= this.count; i++) {
          this.renderedUsers.push(res[i]);
        }
        this.restUsers = this.total.filter(
          (el) => !this.renderedUsers.includes(el)
        );
        this.count = 15;
      });
  }

  private getNextUsers() {
    this.prevUsers = this.renderedUsers;
    this.renderedUsers = [];
    for (let i = 0; i < this.count; i++) {
      this.renderedUsers.push(this.restUsers[i]);
      this.restUsers = this.restUsers.filter(
        (el) => !this.renderedUsers.includes(el)
      );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
