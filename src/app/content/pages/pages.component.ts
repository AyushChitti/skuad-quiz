import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }

  quizLists: any = [];

  ngOnInit() {
    this.service.getAllQuiz().subscribe((data: any) => {
      if (data) {
        this.quizLists = data;
      }
    })
  }

  startQuiz(id) {
    this.router.navigate(['/startquiz/' + id])
  }

}
