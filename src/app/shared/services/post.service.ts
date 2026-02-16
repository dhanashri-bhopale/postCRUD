import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ipost } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private createPostSub : Subject<Ipost> = new Subject<Ipost>()
  createPostObs$ : Observable<Ipost> = this.createPostSub.asObservable()

  private removePostSub : Subject<string> = new Subject<string>()
  removePostObs$ : Observable<string> = this.removePostSub.asObservable()

  private editPostSub : Subject<Ipost> = new Subject<Ipost>()
  editPostObs$ : Observable<Ipost> = this.editPostSub.asObservable()

  private updatePostSub : Subject<Ipost> = new Subject<Ipost>()
  updatePostObs$ : Observable<Ipost> = this.updatePostSub.asObservable()

  constructor(
    private _httpClient : HttpClient
  ) { }

  BASE_URL : string = environment.BASE_URL
  POST_URL : string = `${this.BASE_URL}/posts.json`

  fetchPost() : Observable<any>{
    return this._httpClient.get<any>(this.POST_URL).pipe(
      map(obj => {
        let postArr = []
        for (const key in obj) {
          postArr.unshift({...obj[key], postId : key})
        }
        return postArr
      })
    )
  }

  createPost(post : Ipost) : Observable<any>{
    return this._httpClient.post<Ipost>(this.POST_URL, post)
  }

  setCreatePost(post: Ipost){
    this.createPostSub.next(post)
  }

  removePost(id : string) : Observable<string>{
    let REMOVE_URL : string = `${this.BASE_URL}/posts/${id}.json`
    return this._httpClient.delete<string>(REMOVE_URL)
  }

  setRemovePost(id : string){
    this.removePostSub.next(id)
  }

  setEditPost(post: Ipost){
    this.editPostSub.next(post)
  }

  updatePost(post: Ipost) : Observable<Ipost>{
    let UPDATED_URL : string = `${this.BASE_URL}/posts/${post.postId}.json`
    return this._httpClient.patch<Ipost>(UPDATED_URL, post)
  }

  setUpdatePost(post: Ipost){
    this.updatePostSub.next(post)
  }
}
