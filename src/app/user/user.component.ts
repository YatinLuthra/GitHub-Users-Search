import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../user';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: any;
  numberOfRepos: any;
  private searchTerms = new Subject<string>();

  constructor(private userService: UsersService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }


  ngOnInit(): void {
    this.searchTerms.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((term: string) => this.userService.getUser(term))
    ).subscribe(res => this.user = res)
    this.searchTerms.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((term: string) => this.userService.getRepos(term))
    ).subscribe(res => this.numberOfRepos = res.length)
  }
}
