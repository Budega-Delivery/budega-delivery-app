import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/animations/route.animations';

@Component({
  selector: 'budega-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      }
    ]
  };

  /*
   * TODO: fazer tela de admin
   * TODO: Redirecionar caso tenha a role correta
   * TODO: Rota para edição de usuários
   * TODO: tela para vendas
   * TODO: tela para entregas
   * TODO: adicionar gráficos (vendas, entregas, usuários, estoque)
   *   */
  constructor() {}
  ngOnInit(): void {}
}
