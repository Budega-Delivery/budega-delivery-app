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
  @Input() userList: BudegaUser[];
  dataSource: UserListDataSource;
  translate: TranslateService;

  displayedColumns = ['created', 'name', 'email', 'role', 'active', 'actions'];

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

  remove(_id: string) {}

  // TODO: ativar e desativar usuário
  // TODO: criar página de ediçao
  // TODO: criar método de remoção
}
