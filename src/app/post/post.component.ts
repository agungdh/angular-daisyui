import { Component, inject, OnInit } from '@angular/core';
import { PostService } from './post.service';
import { Post } from './post.model';
import { DefaultComponent } from '../layout/default/default.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [DefaultComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  private readonly postService = inject(PostService);

  posts: Post[] = [];

  ngOnInit(): void {
    // this.postService.getPostData().subscribe((datas: Post[]) => {
    //   this.posts = this.posts.concat(datas);
    //   console.log(this.posts.length);
    // });
  }

  tehe() {
    this.postService.getPostData().subscribe((datas: Post[]) => {
      this.posts = this.posts.concat(datas);

      console.log(this.posts.length);
    });
  }
}
