import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/animations/route.animations';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { Image } from '../../product/models/models';
import { Role } from '../models/models';
import { AppState, selectBudegaUserEditing } from '../user.selectors';
import {
  loadBudegaUserToUpdate,
  removeBudegaUser,
  updateBudegaUser,
  updateBudegaUserImage
} from '../user.actions';

@Component({
  selector: 'budega-edit-product',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEditComponent implements AfterViewInit {
  @ViewChild('fileInput') fileInput: HTMLInputElement;
  @ViewChild('activeToggle') activeToggle: MatSlideToggle;
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  id: string;
  edit$: Observable<any>;
  roleListSelector: Array<Role> = [];
  roleList: Array<Role> = [];
  form: FormGroup;
  imageData: FormData = undefined;
  image: Image;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    public departmentDialog: MatDialog,
    public brandDialog: MatDialog
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(loadBudegaUserToUpdate({ id }));
    this.edit$ = this.store.pipe(
      select(selectBudegaUserEditing),
      filter((val) => val !== undefined)
    );
    this.form = fb.group({
      active: [false],
      id: [''],
      username: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      role: [null],
      image: [null]
    });
  }

  ngAfterViewInit(): void {
    this.edit$.subscribe(({ user, roles }) => {
      this.roleListSelector = roles;
      for (const [k, v] of Object.entries(user)) {
        if (this.form.controls[k]) this.form.controls[k].setValue(v);
        if (k === 'image') this.image = (v as unknown) as Image;
        if (k === 'categories') this.roleList = (v as unknown) as Role[];
      }
    });
    this.form.controls['active'].valueChanges.subscribe(() =>
      this.canBeActive()
    );
  }

  save() {
    if (this.form.valid) {
      this.store.dispatch(updateBudegaUser({ budegaUser: this.form.value }));
    }

    if (this.imageData)
      this.store.dispatch(
        updateBudegaUserImage({
          budegaUser: this.form.value,
          image: this.imageData
        })
      );
  }

  removeProduct() {
    // add confirm dialog
    this.store.dispatch(
      removeBudegaUser({ budegaUserId: this.form.controls['id'].value })
    );
  }

  canBeActive() {
    // verify minimum to be active
    // show warning if cant be active
    // if be active show success and active
    // if (!this.activeToggle) return;
    // if (
    //   !(
    //     this.form.valid &&
    //     this.form.controls['price'].value > 0 &&
    //     this.form.controls['stockAmount'].value > 0 &&
    //     this.form.controls['stockMinimumAlert'].value > 0 &&
    //     this.form.controls['brand'].value !== undefined &&
    //     this.form.controls['department'].value !== undefined
    //   )
    // ) {
    //   this.activeToggle.checked = false;
    //   console.log('cant be active');
    // }
  }

  onFileChange(event: Event) {
    const file = ((event.target as unknown) as HTMLInputElement).files[0];
    if (file) {
      this.imageData = new FormData();
      this.imageData.append('image', file, file.name);
    }
  }

  removeImage() {
    // remove Image
  }

  customCompare(o1, o2) {
    return o1.id === o2.id;
  }
}
