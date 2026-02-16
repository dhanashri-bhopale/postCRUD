import { Component, OnInit } from '@angular/core';
import { Ipost } from '../../models/post';
import { PostService } from '../../services/post.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {
  postArr !: Ipost[]

  constructor(
    private _postService : PostService,
    private _snacbar : SnackbarService
  ) { }

  ngOnInit(): void {
    this.getPost()
    this.createPost()
    this.removePost()
    this.updatePost()
  }

  getPost(){
    this._postService.fetchPost().subscribe({
      next: data => {
        console.log(data)
        this.postArr = data
      },
      error: err => {
        console.log(err);
        
      }
    })
  }

  trackById(index : number, post : Ipost){
    return post.postId
  }

  createPost(){
    this._postService.createPostObs$.subscribe({
      next: data => {
        console.log(data);
        this.postArr.unshift(data)
        this._snacbar.openSnackbar(`Your Post Added Successfully!!!`)
      }
    })
  }

  removePost(){
    this._postService.removePostObs$.subscribe({
      next: data => {
        let getIndex = this.postArr.findIndex(p => p.postId === data)
        this.postArr.splice(getIndex, 1)
        this._snacbar.openSnackbar(`Your Post Removed Successfully!!!`)
      },error: err => {
        console.log(err);
        
      }
    })
  }

  updatePost(){
    this._postService.updatePostObs$.subscribe({
      next: data => {
        console.log(data);
        
        let getIndex = this.postArr.findIndex(p => p.postId === data.postId)
        this.postArr[getIndex] = data
        this._snacbar.openSnackbar(`Your Post Updated Successfully!!!`)
      }
    })
  }

}
