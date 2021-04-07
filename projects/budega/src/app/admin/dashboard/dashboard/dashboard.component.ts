import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'budega-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  constructor() {}

  /*
   * TODO: fazer tela de admin
   * TODO: Redirecionar caso tenha a role correta
   * TODO: Rota para edição de usuários
   * TODO: tela para vendas
   * TODO: tela para entregas
   * TODO: adicionar gráficos (vendas, entregas, usuários, estoque)
   *   */

  ngOnInit(): void {}
}
