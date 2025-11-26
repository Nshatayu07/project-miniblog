import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { getIsLoading, getIsSaving, getSelectedCategory } from '../state/category.selectors';
import { addCategories, deleteCategories, loadCategoriesById, updateCategories } from '../state/category.actions';

@Component({
  selector: 'app-add-category',
  standalone: true,
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
  imports: [
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
})

export class AddCategoryComponent implements OnInit {
  private store: Store = inject(Store);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private fb: FormBuilder = inject(FormBuilder);

  title = signal('Add Category');
  isLoading = toSignal(this.store.select(getIsLoading));
  isSaving = toSignal(this.store.select(getIsSaving));
  selectedCategory$ = this.store.select(getSelectedCategory);
  form!: FormGroup;
  categoryId?: string | null;

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id');
    this.onInitialize();

    if (this.categoryId) {
      this.loadCategory();
      this.title.set('Edit Category');
    }
  }

  onInitialize() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      urlHandle: ['', Validators.required]
    })
  }

  loadCategory() {
    this.store.dispatch(loadCategoriesById({id: this.categoryId!}));
    this.selectedCategory$.subscribe((result) => {      
          this.form.patchValue(result)
    })
  }

  deleteItem() {
    this.store.dispatch(deleteCategories({id: this.categoryId!}));
  }

  onSubmit() {
    if (this.form.valid) {
      const data = this.form.getRawValue();
      this.categoryId
        ? this.store.dispatch(updateCategories({id: this.categoryId!, category: data}))
        : this.store.dispatch(addCategories({category: data}))
    } else {
      console.log("invalid form")
    }
  }

}
