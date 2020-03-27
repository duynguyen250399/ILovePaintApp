import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataConfig } from 'src/config/data';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  public comments;
  public chunkSize = 5;
  public totalComments;

  getComments(productId){
    return this.http.get(DataConfig.baseUrl + '/comments/' + productId);
  }

  loadComments(productId){
    this.http.get(DataConfig.baseUrl + '/comments/' + productId)
    .subscribe(
      res => {
        this.comments = res;
        this.totalComments = this.comments.length;
        this.comments = this.comments.slice(0, this.chunkSize);
        console.log(this.comments)
      },
      err => console.log(err)
    )
  }

  postComment(comment: Comment){
    return this.http.post(DataConfig.baseUrl + '/comments', comment);
  }

  replyComment(reply){
    return this.http.post(DataConfig.baseUrl + '/comments/reply', reply);
  }
}
