import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../core/animations/route.animations';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../admin/user/user.selectors';
import { userClientRegister } from '../../admin/user/user.actions';

@Component({
  selector: 'budega-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientRegisterComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  form = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(4)]],
    lastName: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(private fb: FormBuilder, private userStore: Store<AppState>) {}

  ngOnInit(): void {}

  save() {
    if (this.form.valid)
      this.userStore.dispatch(userClientRegister({ client: this.form.value }));
  }
}
