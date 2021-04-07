import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditProductComponent } from '../product/edit-product.component';
import { ProductBrand } from '../models/models';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'budega-brand-dialog',
  templateUrl: './brand-dialog.component.html',
  styleUrls: ['./brand-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrandDialogComponent implements OnInit {
  // TODO: Dispatch action to save Brand

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    description: [''],
    image: ['']
  });

  constructor(
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductBrand,
    private fb: FormBuilder
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}
}
