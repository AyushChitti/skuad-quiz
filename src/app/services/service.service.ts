import { Injectable } from '@angular/core';
import { CommonHttpService } from './common-http.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpService: CommonHttpService) { }

  getAllQuiz() {
    return this.httpService.get("/api/quiz/all")
  }

  getQuizDetails(id) {
    return this.httpService.get("/api/quiz-questions/all/" + id)
  }

  postAllQuizAnswers(body) {
    return this.httpService.post("/api/user/quiz-score", body)
  }

}
