import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Ipost } from '../../models/post';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  postForm !: FormGroup
  isInEditMode : boolean = false

  constructor(
    private _postService : PostService
  ) { }

  ngOnInit(): void {
    this.getForm()
    this.onEditPost()
  }

  getForm(){
    this.postForm = new FormGroup({
      title : new FormControl(null, [Validators.required]),
      content : new FormControl(null, [Validators.required])
    })
  }

  get title(){
    return this.postForm.get(['title']) as FormControl
  }

  get content(){
    return this.postForm.get(['content']) as FormControl
  }

  onPostAdd(){
    if(this.postForm.valid){
      let postObj : Ipost = {...this.postForm.value}
      this._postService.createPost(postObj).subscribe({
        next : data => {
          console.log(data);
          this._postService.setCreatePost({...postObj, postId : data.name})
          this.postForm.reset()
          
        },error : err => {
          console.log(err);
          
        }
      })
    }
  }

  editId !: string
  onEditPost(){
    this._postService.editPostObs$.subscribe({
      next: data => {
        this.postForm.patchValue(data)
        this.isInEditMode = true
        this.editId = data.postId
      },error : err => {
        console.log(err);
        
      }
    })
  }

  updatePost(){
    if(this.postForm.valid){
      let updatedObj : Ipost = {
        ...this.postForm.value, postId : this.editId
      }
      this._postService.updatePost(updatedObj).subscribe({
        next: data => {
          console.log(data);
          
          this._postService.setUpdatePost(data)
          this.postForm.reset()
          this.isInEditMode = false
        },error : err => {
          console.log(err);
          
        }
      })
    }
  }

}
