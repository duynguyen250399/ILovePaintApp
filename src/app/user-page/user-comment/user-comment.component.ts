import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { getPayload } from 'src/helpers/helper';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-user-comment',
  templateUrl: './user-comment.component.html',
  styleUrls: ['./user-comment.component.css']
})
export class UserCommentComponent implements OnInit {

  @Input() comment;
  public showReplyForm = false;
  public replyContent: string;
  public loading = false;

  constructor(private router: Router,
    private commentService: CommentService) { }

  ngOnInit() {
    if(!this.comment.user.image){
      this.comment.user.image = '../../../assets/images/user_default.png';
    }

    if(this.comment.commentReplies){
      this.comment.commentReplies.forEach(r => {
        if(!r.user.image){
          r.user.image = '../../../assets/images/user_default.png';
        }
      });
    }
  }

  toggleReply(e){
    e.preventDefault();
    this.showReplyForm = !this.showReplyForm;
  }

  onKey(e: KeyboardEvent){
    if(e.key == 'Enter'){
      this.postReply();
    }
  }

  postReply(){
    if(!this.replyContent){
      return;
    }
    this.loading = true;

    let token = localStorage.getItem('jwt');
    if(!token){
      this.router.navigate(['user-login']);
    }

    let payload = getPayload();

    let replyModel = {
      userID: payload.nameid,
      productCommentID: this.comment.id,
      content: this.replyContent,
      role: payload.role,
      replyDate: new Date()
    }

    this.commentService.replyComment(replyModel)
    .subscribe(
      res =>{
        this.commentService.loadComments(this.comment.productID);
        this.loading = false;
        this.replyContent = '';
      },
      err =>{
        console.log(err);
        this.loading = false;
      }
    )
    
  }

}
