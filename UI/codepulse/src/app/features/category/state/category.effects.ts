import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CategoryService } from "../services/category.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { inject } from "@angular/core";
import { addCategories, addCategoriesFailure, addCategoriesSuccess, deleteCategories, deleteCategoriesFailure, deleteCategoriesSuccess, laodCategoriesByIdSuccess, loadCategories, loadCategoriesById, loadCategoriesFailure, loadCategoriesSuccess, updateCategories, updateCategoriesFailure, updateCategoriesSuccess } from "./category.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { Router } from "@angular/router";


export const categoryEffects = {
    getAllCategories$: createEffect(
        (
            action$ = inject(Actions),
            categoryService = inject(CategoryService),
            snack = inject(MatSnackBar)
        ) =>
            action$.pipe(
                ofType(loadCategories),
                switchMap(() =>
                    categoryService.getCategories().pipe(
                        map((categories) => {
                            return loadCategoriesSuccess({ categories });
                        }),
                        catchError((error) => {
                            snack.open("Failed to load categories!", "Close", { duration: 3000 });
                            return of(loadCategoriesFailure({ error }))
                        })
                    )
                )
            ),
        { functional: true }
    ),

    getCategoryById$: createEffect(
        (
            action$ = inject(Actions),
            categoryService = inject(CategoryService),
            snack = inject(MatSnackBar)
        ) =>
            action$.pipe(
                ofType(loadCategoriesById),
                switchMap((action) =>
                    categoryService.getCategoryById(action.id).pipe(
                        map((category) => laodCategoriesByIdSuccess({ category })),
                        catchError((error) => {
                            snack.open("Failed to load category!", "Close", { duration: 3000 });
                            return of(loadCategoriesFailure({ error }));
                        })
                    )
                )
            ),
        { functional: true }
    ),

    addCategories$: createEffect(
        (
            action$ = inject(Actions),
            categoryService = inject(CategoryService),
            snack = inject(MatSnackBar),
            router = inject(Router)
        ) =>
            action$.pipe(
                ofType(addCategories),
                switchMap((action) =>
                    categoryService.addCategory(action.category).pipe(
                        map((category) => {
                            snack.open("Category added successfully!", "Close", { duration: 3000 });
                            router.navigate(['admin/categories']);
                            return addCategoriesSuccess({ category })
                        }),
                        catchError((error) => {
                            snack.open("Failed to add category!", "Close", { duration: 3000 });
                            return of(addCategoriesFailure({ error }));
                        })
                    )
                )
            ),
        { functional: true }
    ),

    updateCategories$: createEffect(
        (
            action$ = inject(Actions),
            categoryService = inject(CategoryService),
            snack = inject(MatSnackBar),
            router = inject(Router)
        ) =>
            action$.pipe(
                ofType(updateCategories),
                switchMap((action) =>
                    categoryService.updateCategory(action.id, action.category).pipe(
                        map((category) => {
                            snack.open("Category updated successfully!", "Close", { duration: 3000 });
                            router.navigate(['admin/categories'])
                            return updateCategoriesSuccess({ category })
                        }),
                        catchError((error) => {
                            snack.open("Failed to update category!", "Close", { duration: 3000 });
                            return of(updateCategoriesFailure({ error }));
                        })
                    )
                )
            ),
        { functional: true }
    ),

    deleteCategories$: createEffect(
        (
            action$ = inject(Actions),
            categoryService = inject(CategoryService),
            snack = inject(MatSnackBar),
            router = inject(Router)
        ) =>
            action$.pipe(
                ofType(deleteCategories),
                switchMap((action) =>
                    categoryService.deleteCategory(action.id).pipe(
                        map((category) => {
                            snack.open("Category deleted successfully!", "Close", { duration: 3000 });
                            router.navigate(['admin/categories']);
                            return deleteCategoriesSuccess({ category })
                        }),
                        catchError((error) => {
                            snack.open("Failed to delete category!", "Close", { duration: 3000 });
                            return of(deleteCategoriesFailure({ error }));
                        })
                    )
                )
            ),
        { functional: true }
    ),
}