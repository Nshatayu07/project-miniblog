import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { BlogpostService } from '../services/blogpost.service';
import { finalize, Observable } from 'rxjs';
import { BlogPost } from '../models/blogpost.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { getBlogposts, getIsLoading } from '../state/blogpost.selectors';
import { laodBlogposts } from '../state/blogpost.actions';

@Component({
  selector: 'app-blogpost-list',
  standalone: true,
  templateUrl: './blogpost-list.component.html',
  styleUrl: './blogpost-list.component.css',
  imports: [RouterLink, CommonModule, DatePipe, MatProgressSpinnerModule],
})
export class BlogpostListComponent implements OnInit {
  private store: Store = inject(Store);

  blogposts$: Observable<BlogPost[] | null> = this.store.select(getBlogposts);
  isLoading$: Observable<boolean | null> = this.store.select(getIsLoading);

  ngOnInit(): void {
    this.store.dispatch(laodBlogposts());
  }
}
