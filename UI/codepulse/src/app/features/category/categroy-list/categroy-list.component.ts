import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';
import { finalize, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { getCategories, getIsLoading } from '../state/category.selectors';
import { loadCategories } from '../state/category.actions';

@Component({
  selector: 'app-categroy-list',
  standalone: true,
  templateUrl: './categroy-list.component.html',
  styleUrl: './categroy-list.component.css',
  imports: [RouterLink, CommonModule, MatProgressSpinnerModule],
})

export class CategroyListComponent implements OnInit {
  private store: Store = inject(Store);
  categoryService: CategoryService = inject(CategoryService);

  categories$: Observable<Category[]> = this.store.select(getCategories);
  isLoading = toSignal(this.store.select(getIsLoading));

  ngOnInit() {
    this.store.dispatch(loadCategories());
  }
}
