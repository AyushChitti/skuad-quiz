import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-quiz-questions',
  templateUrl: './quiz-questions.component.html',
  styleUrls: ['./quiz-questions.component.scss']
})
export class QuizQuestionsComponent implements OnInit {

  constructor(private router: Router, private service: ServiceService, private _route: ActivatedRoute) { }
  
  quizID: number = 0;
  quizDetails: any;
  loaderTime: boolean = false;
  reverseTime: any = 15;
  setIntervalTimer;
  questionNumber: number = 0;
  currentQuestion: any;
  numberOfQuestions: number = 0;
  optionsArray: any = [];
  showNextButton: boolean = false;
  mappings: any = [];
  resultKey: any = [];
  selectedQuestionValue: number = 0;
  selectedQuestionId: number = 0;

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      if(params.id) {
        this.quizID = params.id;
      }
      this.getQuizDetails();
    });
  }

  getQuizDetails() {
    this.service.getQuizDetails(this.quizID).subscribe((data: any) => {
      if(data) {
        this.quizDetails = data;
        this.numberOfQuestions = data.questions.length;
        this.questionNumber = 1;
        this.displayQuestions();
      }
    })
  }

  displayTimer() {
    if(this.reverseTime != "00") {
      this.reverseTime = this.reverseTime - 1;
      this.reverseTime = this.reverseTime < 10 ? '0' + this.reverseTime : this.reverseTime;
    }
    if(this.reverseTime == '00') {
      clearInterval(this.setIntervalTimer);
      this.loaderTime = false;
      this.questionNumber = this.questionNumber + 1;
      this.showNextButton = false;
      if(this.questionNumber <= this.numberOfQuestions) {
        this.reverseTime = 15;
        this.displayQuestions();
      }
      else {
        this.submitAllAnswers();
      }
    }
  }

  setTimer() {
    this.loaderTime = true;
    let that = this;
    this.setIntervalTimer = setInterval(function() {
      that.displayTimer();
    }, 1000);
  }

  displayQuestions() {
    this.currentQuestion = this.quizDetails.questions[this.questionNumber-1];
    this.optionsArray = this.currentQuestion.options.split(",");
    this.setTimer();
    this.showNextButton = false;
  }

  saveResult(value, id) {
    this.selectedQuestionId = id;
    this.selectedQuestionValue = value;
    this.showNextButton = true;
  }

  submitAllAnswers() {
    let body = {
      "quiz_id": this.quizID,
      "mappings": this.mappings
    }
    this.service.postAllQuizAnswers(body).subscribe((data: any) => {
      if(data) {
        this.resultKey = data;
      }
    })
  }

  nextClick() {
    let body = {
      "ques_id": this.selectedQuestionId,
      "submitted_option": this.selectedQuestionValue
    }
    this.mappings.push(body);
    this.reverseTime = "00";
    this.displayTimer();
  }

  startQuiz() {
    this.router.navigate(['']);
  }

}
