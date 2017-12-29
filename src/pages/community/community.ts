import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Modal, ModalController, ModalOptions  } from 'ionic-angular';
import {MomentServiceProvider} from "../../providers/moment-service/moment-service";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {AppConfig} from "../../app/app.config";
import {computeMsgId} from "@angular/compiler/src/i18n/digest";

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
  posts=[];
  //posts : [{id:string,title:string,content:string,likenum:Number,commentnum:Number,posttime:Number,user:{name:string},comments:[{content:string,commenter:{targetuser:{name:string}}}]}]=null;
  userInfo;
  username;
  parentCommentId = -1;
  targetUser = null;
  likeOrNot = [];
  private readonly avatarURL: string = 'http://120.79.42.137:8080/file/Ud7adca934ab4e/Card/Userinfo/';
  private readonly picURL:string = 'http://120.79.42.137:8080/file/Ud7adca934ab4e/Card/Posts/';

  // commentListDiv = null;

  constructor(private authService:AuthServiceProvider,private momentService:MomentServiceProvider,public navCtrl: NavController, public navParams: NavParams,private modal: ModalController) {

    this.username = AppConfig.getUsername();


    authService.getUserInfoByName(this.username).subscribe(data=>{
      this.userInfo = data;

    })

  }

  timeStampToString(time):string{
    let date = new Date();
    date.setTime(time);
    return date.toLocaleString();
  }

  updateArrs(){
    for(let i in this.posts){
      let postId = this.posts[i].id;
      this.showComments[postId] = false;
      this.placeholder[postId] = 'comment';
      this.momentService.likeOrNot(this.userInfo.id,postId).subscribe(isLike=>{
        this.likeOrNot[postId] = isLike;
      })
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunityPage');
  }

  ionViewWillEnter(){
    this.momentService.getMomentList().subscribe(data=>{
      this.posts = data;
      // for(let post of this.posts){
      //   let date = new Date();
      //   date.setTime(post.posttime);
      //   posttimeStr[post.id] = date.toLocaleString();
      // }
      this.updateArrs();
    });
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
    if(this.likeOrNot[post.id]){
      this.momentService.cancelLikeMoment(this.userInfo.id,post.id).subscribe(data=>{
        this.momentService.updateMoment(post,'likenum',post.likenum-1).subscribe(data=>{})
      });
      console.log("cancel like "+post.id);

    }else{
      this.momentService.addLikeMoment(this.userInfo.id,post.id).subscribe(data=>{
        this.momentService.updateMoment(post,'likenum',post.likenum+1).subscribe(data=>{})
      })
    }
    this.likeOrNot[post.id] = !this.likeOrNot[post.id];
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
  replyClicked(targetuser,post,comment,commentInput){
    // if(targetuser.id == this.userInfo.include.id){
    //   alert("不可以回复自己！");
    //   return;
    // }
    this.placeholder[post.id] = "@"+comment.commenter.include.name+" ";
    this.parentCommentId = comment.id;
    this.targetUser = targetuser;
    commentInput.setFocus();
  }
  //
  // tapEvent(e){
  //   console.log('tap');
  // }

  inputOnFocus(){
    this.commentContent = '';
  }
  submitComment(post)
  {
    this.momentService.postComment(this.commentContent,this.parentCommentId,this.userInfo.id,this.targetUser).subscribe(comment=>{
      post.comments.push(comment);
      console.log(post);
      post.commentnum += 1;
      this.momentService.updateMoment(post,'comments',post.comments).subscribe(data=>{
        console.log(data);
      });
    });
    console.log("submit comment");
  }



}
