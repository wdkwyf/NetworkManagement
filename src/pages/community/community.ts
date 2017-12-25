import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Modal, ModalController, ModalOptions  } from 'ionic-angular';
import {MomentServiceProvider} from "../../providers/moment-service/moment-service";

/**
 * Generated class for the CommunityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-community',
  templateUrl: 'community.html',
})
export class CommunityPage {
  showComments = {};
  commentContent="";
  placeholder={};
  posts;

  // commentListDiv = null;

  constructor(private momentService:MomentServiceProvider,public navCtrl: NavController, public navParams: NavParams,private modal: ModalController) {
    momentService.getMomentList().subscribe(data=>{
      this.posts = data;
    });
    this.updateArrs();

  }

  updateArrs(){
    for(let i in this.posts){
      let postId = this.posts[i].id;
      this.showComments[postId] = false;
      this.placeholder[postId] = 'comment';
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunityPage');
  }

  postButtonClicked(){

      const myModalOptions: ModalOptions = {
        enableBackdropDismiss: false
      };

      const myModalData = {
        name: 'Paul Halliday',
        occupation: 'Developer'
      };

      const myModal: Modal = this.modal.create('PostMomentPage', { data: myModalData }, myModalOptions);

      myModal.present();

      myModal.onDidDismiss((data) => {
        console.log("I have dismissed.");
        console.log(data);

        if(data){
          this.posts.push(data);
          this.updateArrs();
        }

      });

      myModal.onWillDismiss((data) => {
        console.log("I'm about to dismiss");
        console.log(data);
      });



  }


  like(post){
    this.momentService.updateMoment(post,'likeNum',post.likeNum+1)
    console.log("like "+post.id);

  }
  viewComments(post){
    this.showComments[post.id] = !this.showComments[post.id];
  }

  // viewComments(post){
    // console.log("viewComments");
  //   let commentListContainer = document.getElementById("commentListContainer");
  //   if(commentListContainer.hasAttribute("hidden")) {
  //     this.showComments = !this.showComments;
  //     if(this.commentListDiv == null)
  //       this.commentListDiv = this.generateCommentList(post.comments);
  //     console.log(this.commentListDiv);
  //     commentListContainer.removeAttribute("hidden");
  //     let commentListElement = document.getElementById("commentList");
  //     commentListElement.innerHTML = this.commentListDiv;
      // document.getElementById("commentList").innerHTML=this.commentListDiv;
    // }else {
    //    commentListContainer.setAttribute("hidden","hidden");
    // }
  // }


  // generateCommentItem(comment){
  //   let commentItem =  '<div class="commentItem"><img class="avatar" src="'+comment.commenter.avatar
  //     +'"><div class="commentItemContent"><div class="info"><div class="infoContent"><span>'+comment.commenter.name+'</span><span>'
  //     +comment.content+'</span></div><button ion-button (click)="reply('+comment.id+')">aaa</button></div>';
  //   for (let i=0;i<comment.subComments.length;i++){
  //     commentItem = commentItem + this.generateCommentItem(comment.subComments[i]);
  //   }
  //   commentItem = commentItem+'</div></div>';
  //   return commentItem;
  //
  // }
  //
  // generateCommentList(comments){
  //   var commentListDiv = '';
  //   for(var i=0;i<comments.length;i++){
  //     commentListDiv = commentListDiv + this.generateCommentItem(comments[i]);
  //   }
  //   return commentListDiv;
  // }
  //
  replyClicked(post,comment,commentInput){
    this.placeholder[post.id] = "@"+comment.commenter.name+" ";
    commentInput.setFocus();
  }
  //
  // tapEvent(e){
  //   console.log('tap');
  // }
  submitComment()
  {
    console.log("submit comment");
  }



}
