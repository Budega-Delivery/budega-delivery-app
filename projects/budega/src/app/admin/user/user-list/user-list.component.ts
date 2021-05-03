import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  Input,
  AfterViewInit
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { BudegaUser } from '../models/models';
import { UserListDataSource } from './user-list-datasource';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'budega-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<BudegaUser>;
  // @ViewChild('activeToggle') activeToggle: MatSlideToggle;
  @Input() userList: BudegaUser[];
  dataSource: UserListDataSource;
  translate: TranslateService;
  api = environment.api.url;

  displayedColumns = [
    'created',
    'name',
    'image',
    'email',
    'role',
    'emailVerified',
    'active',
    'actions'
  ];

  constructor(translate: TranslateService) {
    this.translate = translate;
  }

  ngOnInit() {
    this.dataSource = new UserListDataSource(this.userList);
  }

  ngAfterViewInit() {
    this.translate
      .get([
        'budega.table.itemsperpagelabel',
        'budega.table.firstpagelabel',
        'budega.table.lastpagelabel',
        'budega.table.previouspagelabel',
        'budega.table.nextpagelabel'
      ])
      .subscribe((res) => {
        this.paginator._intl.itemsPerPageLabel =
          res['budega.table.itemsperpagelabel'];
        this.paginator._intl.firstPageLabel =
          res['budega.table.firstpagelabel'];
        this.paginator._intl.lastPageLabel = res['budega.table.lastpagelabel'];
        this.paginator._intl.previousPageLabel =
          res['budega.table.previouspagelabel'];
        this.paginator._intl.nextPageLabel = res['budega.table.nextpagelabel'];
      });
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  remove(id: string) {}

  inactive(id: string) {}

  // TODO: ativar e desativar usuário
  // TODO: criar método de remoção
  // TODO: confirm dialog para remoção
}
