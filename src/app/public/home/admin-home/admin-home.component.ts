import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChartType, GoogleChartComponent } from 'angular-google-charts';
import { CategoryService } from 'src/app/service/category.service';
import {
  ApiResponse,
  CategoryDto,
  GoogleChart,
} from './../../../model/app.model';
import { AdminDashboardService } from './../../../service/admin-dashboard.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  date: string;
  categoryPieChart: GoogleChart;
  monthlyIncomesBarsChart: GoogleChart;
  monthlyExpensesBarsChart: GoogleChart;
  IncomeAndExpenseLinesChart: GoogleChart;
  currentMonthIncome: number;
  currentMonthExpense: number;
  months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // @ViewChild('chart', { static: true })
  // public chart!: GoogleChartComponent;

  constructor(
    private router: Router,
    private adminDashboardService: AdminDashboardService,
    private categoryService: CategoryService
  ) {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    this.date = mm + '/' + dd + '/' + yyyy;

    this.instantiateCategoryPieChart();
    this.instantiateExpenseBarsChart();
    this.instantiateIncomeBarsChart();
    this.instantiateIncomeAndExpenseLineChart();

    this.adminDashboardService
      .getCurrentMonthIncomes()
      .subscribe((resp) => (this.currentMonthIncome = resp.data['income']));

    this.adminDashboardService
      .getCurrentMonthExpenses()
      .subscribe((resp) => (this.currentMonthExpense = resp.data['expense']));
  }

  public ngOnInit() {}

  instantiateCategoryPieChart() {
    let pieChartData: [string, number][] = [];

    this.categoryService.getAll().subscribe((categories: CategoryDto[]) => {
      categories.forEach((c) => {
        this.adminDashboardService
          .getProductsTotalQuantityByCategory(c.id)
          .subscribe((resp: ApiResponse) => {
            pieChartData.push([c.categoryName, resp.data['quantity']]);

            // Create Chart
            this.categoryPieChart = {
              title: 'Category By Product Quantity',
              type: ChartType.PieChart,
              columns: ['', ''],
              data: pieChartData,
            };
          });
      });
    });
  }

  instantiateExpenseBarsChart() {
    let barChartData: [string, number, string][] = [];

    this.adminDashboardService
      .getMonthlyExpenses()
      .subscribe((resp: ApiResponse) => {
        resp.data['expenses'].forEach((e: number, index: number) => {
          barChartData.push([this.months[index], e, 'red']);

          this.monthlyExpensesBarsChart = {
            title: 'Monthly Expense',
            type: ChartType.BarChart,
            columns: ['Months', 'Expense', { role: 'style', type: 'string' }],
            options: {
              colors: ['red'],
            },
            data: barChartData,
          };
        });
      });
  }

  instantiateIncomeBarsChart() {
    let barChartData: [string, number, string][] = [];

    this.adminDashboardService
      .getMonthlyIncomes()
      .subscribe((resp: ApiResponse) => {
        resp.data['incomes'].forEach((e: number, index: number) => {
          barChartData.push([this.months[index], e, '']);

          this.monthlyIncomesBarsChart = {
            title: 'Monthly Income',
            type: ChartType.BarChart,
            columns: ['Months', 'Income', { role: 'style', type: 'string' }],
            data: barChartData,
          };
        });
      });
  }

  instantiateIncomeAndExpenseLineChart() {
    let lineChartData: [string, number, number][] = [];

    this.adminDashboardService
      .getMonthlyIncomes()
      .subscribe((resp: ApiResponse) => {
        let incomes = resp.data['incomes'];

        this.adminDashboardService
          .getMonthlyExpenses()
          .subscribe((resp: ApiResponse) => {
            resp.data['expenses'].forEach((expense: number, index: number) => {
              lineChartData.push([this.months[index], incomes[index], expense]);

              this.IncomeAndExpenseLinesChart = {
                title: 'Performance',
                type: ChartType.LineChart,
                data: lineChartData,
                columns: ['Months', 'Incomes', 'Expenses'],
                options: {
                  hAxis: {
                    title: 'Month',
                  },
                  vAxis: {
                    title: '',
                  },
                },
              };
            });
          });
      });
  }
}
