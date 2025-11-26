import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { getCurrentBlogpost, getIsLoading, getIsSaving } from '../state/blogpost.selectors';
import { addBlogpost, deleteBlogpost, loadBlogpostById, updateBlogpost } from '../state/blogpost.actions';
import { BlogPost } from '../models/blogpost.model';
import { loadCategories } from '../../category/state/category.actions';
import { getCategories } from '../../category/state/category.selectors';

@Component({
  selector: 'app-add-edit-blogpost',
  standalone: true,
  templateUrl: './add-edit-blogpost.component.html',
  styleUrl: './add-edit-blogpost.component.css',
  imports: [
    ReactiveFormsModule, CommonModule,
    MarkdownComponent, MatProgressSpinnerModule
  ]
})
export class AddEditBlogpostComponent implements OnInit {
  private store: Store = inject(Store);
  private fb: FormBuilder = inject(FormBuilder);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private categoryService: CategoryService = inject(CategoryService);
  private snackBar: MatSnackBar = inject(MatSnackBar);

  selectedBlogpost$: Observable<BlogPost | null> = this.store.select(getCurrentBlogpost);
  categories = toSignal(this.store.select(getCategories));
  isLoading = toSignal(this.store.select(getIsLoading));
  isSaving = toSignal(this.store.select(getIsSaving));

  form!: FormGroup;
  blogPostId = signal<string | null>(null);
  title = signal('Add Blog Post');

  ngOnInit(): void {
    this.blogPostId.set(this.route.snapshot.paramMap.get('id'));
    this.initializeForm();
    this.loadCategories();
    if (this.blogPostId()) {
      this.loadBlogpost();
      this.title.set('Edit Blog Post');
    }
  }

  initializeForm() {
    const today = new Date().toISOString().split('T')[0];
    this.form = this.fb.group({
      title: ['', Validators.required],
      shortDescription: ['', Validators.required],
      content: ['', Validators.required],
      featuredImageUrl: ['', Validators.required],
      urlHandle: ['', Validators.required],
      publishedDate: [today, Validators.required],
      author: ['', Validators.required],
      isVisible: [true, Validators.required],
      categories: [[]]
    })
  }

  loadCategories() {
    this.store.dispatch(loadCategories());
  }

  loadBlogpost() {
    this.loadCategories();
    this.store.dispatch(loadBlogpostById({ id: this.blogPostId()! }));
    this.selectedBlogpost$.subscribe((response) => {
      const formattedDate = response?.publishedDate
        ? response.publishedDate.toString().split('T')[0]
        : '';

      const responseCategories = response?.categories?.map(x => x.id);
      this.form.patchValue({
        ...response,
        categories: responseCategories,
        publishedDate: formattedDate
      });
    })
  }

  onDelete() {
    this.store.dispatch(deleteBlogpost({ id: this.blogPostId()! }));
  }

  onSubmit() {
    if (this.form.valid) {
      const data = this.form.getRawValue();
      console.log(data);
      this.blogPostId()
        ? this.store.dispatch(updateBlogpost({ id: this.blogPostId()!, blogpost: data }))
        : this.store.dispatch(addBlogpost({ blogpost: data }))
    } else {
      console.log("Invalid Form");
    }
  }
}
