import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { PostService } from './post.service';
import { Post } from './post.model';
import { DefaultComponent } from '../layout/default/default.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [DefaultComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  private readonly postService = inject(PostService);
  private readonly destroyRef = inject(DestroyRef);

  posts: Post[] = [];

  ngOnInit(): void {
    this.postService.getPostData()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((datas: Post[]) => {
      this.posts = this.posts.concat(datas);
    });
  }
}
