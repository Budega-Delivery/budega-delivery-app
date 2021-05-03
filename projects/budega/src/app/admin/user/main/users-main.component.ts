import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/animations/route.animations';
import { Observable } from 'rxjs';
import { BudegaUser } from '../models/models';
import { Store } from '@ngrx/store';
import { AppState, selectBudegaUserList } from '../user.selectors';
import { loadBudegaUsers } from '../user.actions';

@Component({
  selector: 'budega-users-main',
  templateUrl: './users-main.component.html',
  styleUrls: ['./users-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersMainComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  userList$: Observable<BudegaUser[]>;

  constructor(private userStore: Store<AppState>) {
    // TODO: Add button to Create User and Create user view
    this.userList$ = this.userStore.select(selectBudegaUserList);
  }

  ngOnInit(): void {
    this.userStore.dispatch(loadBudegaUsers());
  }
}
