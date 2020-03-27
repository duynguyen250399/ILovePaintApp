import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/models/comment.model';
import { CommentService } from 'src/app/services/comment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

  @Input() productID;
  public content: string;
  public loading = false;

  constructor(private commentService: CommentService,
    private router: Router) { }

  ngOnInit() {
    
  }

  onKey(event: KeyboardEvent){
    if(event.key == 'Enter'){
      this.postComment();
    }
  }

  postComment(){
    if(!this.content){
      return;
    }

    this.loading = true;

    let token = localStorage.getItem('jwt');
    if(!token){
      this.router.navigate(['user-login']);
    }

    let payloadToken = token.split('.')[1];
    let payload = JSON.parse(window.atob(payloadToken));

    let comment: Comment = {
      productID: this.productID,
      content: this.content,
      role: payload.role,
      userID: payload.nameid,
      commentDate: new Date()
    };

    this.commentService.postComment(comment)
    .subscribe(
      res =>{
        console.log(res);
        this.commentService.loadComments(this.productID);
        this.loading = false;
        this.content = '';
      },
      err => {
        console.log(err);
        this.loading = false;
      }
    )

  }

}
