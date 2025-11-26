import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, take } from 'rxjs';
import { BlogPost } from '../models/blogpost.model';
import { CommonModule, DatePipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MarkdownComponent } from "ngx-markdown";
import { Store } from '@ngrx/store';
import { getCurrentBlogpost, getError, getIsLoading } from '../state/blogpost.selectors';
import { loadBlogpostByUrl } from '../state/blogpost.actions';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-blogpost',
  standalone: true,
  templateUrl: './blogpost.component.html',
  styleUrl: './blogpost.component.css',
  imports: [CommonModule, MatProgressSpinnerModule, DatePipe, MarkdownComponent]
})
export class BlogpostComponent implements OnInit {
  private store: Store = inject(Store)
  private route: ActivatedRoute = inject(ActivatedRoute);

  blogpost$: Observable<BlogPost | null> = this.store.select(getCurrentBlogpost);
  isLoading$: Observable<boolean | null> = this.store.select(getIsLoading);
  error$: Observable<string | null> = this.store.select(getError);
  blogpost = toSignal(this.blogpost$);
  
  ngOnInit(): void {
    const url = this.route.snapshot.paramMap.get('url');
    this.loadBlogpost(url!);
  }

  loadBlogpost(url: string){
    this.store.dispatch(loadBlogpostByUrl({url}));
  }
}
