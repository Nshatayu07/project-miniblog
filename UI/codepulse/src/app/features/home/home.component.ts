import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { BlogPost } from '../blogpost/models/blogpost.model';
import { BlogpostService } from '../blogpost/services/blogpost.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from "@angular/router";
import { Store } from '@ngrx/store';
import { getBlogposts, getIsLoading } from '../blogpost/state/blogpost.selectors';
import { laodBlogposts } from '../blogpost/state/blogpost.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [CommonModule, MatProgressSpinnerModule, RouterLink]
})
export class HomeComponent implements OnInit {
  private store: Store = inject(Store);

  blogposts$: Observable<BlogPost[] | null> = this.store.select(getBlogposts);
  isLoading$: Observable<boolean | null> = this.store.select(getIsLoading);

  ngOnInit(): void {
    this.store.dispatch(laodBlogposts());
  }
}
