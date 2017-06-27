import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('enter', [
      transition(':enter', [
        style({opacity: 0}),
        animate('200ms', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('200ms', style({opacity: 0}))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  private error = false;
  private articles = [];
  private savedArticles;
  private minDate: Date;
  private maxDate: Date;
  private endDate: Date;
  private startDate;
  private dropdown = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getAtricles().subscribe(response => {
      const results = JSON.parse(response['_body']).results;
      this.articles = results;
      this.savedArticles = results;

      // results are sorted by API from oldest to newest
      this.minDate = new Date(results[0].published_date);
      this.startDate = this.minDate;
      this.maxDate = new Date(results[results.length - 1].published_date);
      this.endDate = this.maxDate;
    },
    error => {
      console.log(error);
      this.error = true;
    });
  }

  dropdownChange() {
    this.dropdown = !this.dropdown;
  }

  filterArticles() {
    // sets the end day one day ahead, becuse date object sets it at 00:00
    const endD = new Date();
    endD.setDate(this.endDate.getDate() + 1);
    this.articles = this.savedArticles.filter(article => {
      const published_date = new Date(article.published_date);
      if (this.startDate <= published_date && published_date <= endD) {
        return article;
      }
    });

    // reset date pickers
    this.startDate = this.minDate;
    this.endDate = this.maxDate;
  }

}
