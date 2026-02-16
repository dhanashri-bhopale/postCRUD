import { Component, Input, OnInit } from '@angular/core';
import { Ipost } from '../../models/post';
import { PostService } from '../../services/post.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input() post !: Ipost

  constructor(
    private _postService : PostService,
    private _matDialog : MatDialog
  ) { }

  ngOnInit(): void {
  }

  onRemove(id : string){
    let matConfig = new MatDialogConfig()
    matConfig.width = '450px',
    matConfig.disableClose = true
    matConfig.data = `Are You Sure, You Want to Remove This Post with Id <strong>${id}</strong>`

    this._matDialog.open(GetConfirmComponent, matConfig).afterClosed().subscribe(res => {
      if(res){
        this._postService.removePost(id).subscribe({
          next : data => {
            console.log(data);
            this._postService.setRemovePost(id)
            
          },error : err => {
            console.log(err);
            
          }
        })
      }
    })
  }

  onEdit(post : Ipost){
    this._postService.setEditPost(post)
  }

}
