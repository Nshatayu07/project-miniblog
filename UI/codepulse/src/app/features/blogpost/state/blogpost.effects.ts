import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BlogpostService } from "../services/blogpost.service";
import {
    addBlogpost, addBlogpostFailure, addBlogpostSuccess, deleteBlogpost,
    deleteBlogpostFailure, deleteBlogpostSuccess, laodBlogpostByIdFailure,
    laodBlogpostByIdSuccess, laodBlogpostByUrlFailure, laodBlogpostByUrlSuccess,
    laodBlogpostFailure, laodBlogposts, laodBlogpostSuccess, loadBlogpostById,
    loadBlogpostByUrl, updateBlogpost, updateBlogpostFailure, updateBlogpostSuccess
} from "./blogpost.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

export const blogpostEffects = {
    getAllBlogposts$: createEffect(
        (
            action$ = inject(Actions),
            blogService = inject(BlogpostService),
            snack = inject(MatSnackBar)
        ) =>
            action$.pipe(
                ofType(laodBlogposts),
                switchMap(() =>
                    blogService.getBlogposts().pipe(
                        map((blogposts) => {
                            // snack.open("Blogposts loaded successfully!", "Close", { duration: 3000 });
                            return laodBlogpostSuccess({ blogposts });
                        }),
                        catchError((error) => {
                            snack.open("Failed to load blogposts!", "Close", { duration: 3000 });
                            return of(laodBlogpostFailure({ error }));
                        })
                    )
                )
            ),
        { functional: true }
    ),

    getBlogpostById$: createEffect(
        (
            action$ = inject(Actions),
            blogService = inject(BlogpostService),
            snack = inject(MatSnackBar)
        ) =>
            action$.pipe(
                ofType(loadBlogpostById),
                switchMap((action) =>
                    blogService.getBlogpostById(action.id).pipe(
                        map((blogpost) => {
                            // snack.open("Blogpost loaded!", "Close", { duration: 3000 });
                            return laodBlogpostByIdSuccess({ blogpost });
                        }),
                        catchError((error) => {
                            snack.open("Failed to load blogpost!", "Close", { duration: 3000 });
                            return of(laodBlogpostByIdFailure({ error }));
                        })
                    )
                )
            ),
        { functional: true }
    ),

    getBlogpostByUrl$: createEffect(
        (
            action$ = inject(Actions),
            blogService = inject(BlogpostService),
            snack = inject(MatSnackBar)
        ) =>
            action$.pipe(
                ofType(loadBlogpostByUrl),
                switchMap((action) =>
                    blogService.getBlogpostByUrl(action.url).pipe(
                        map((blogpost) => {
                            // snack.open("Blogpost loaded!", "Close", { duration: 3000 });
                            return laodBlogpostByUrlSuccess({ blogpost });
                        }),
                        catchError((error) => {
                            snack.open("Failed to load blogpost!", "Close", { duration: 3000 });
                            return of(laodBlogpostByUrlFailure({ error }));
                        })
                    )
                )
            ),
        { functional: true }
    ),

    addBlogpost$: createEffect(
        (
            action$ = inject(Actions),
            blogService = inject(BlogpostService),
            snack = inject(MatSnackBar),
            router = inject(Router)
        ) =>
            action$.pipe(
                ofType(addBlogpost),
                switchMap((action) =>
                    blogService.addBlogpost(action.blogpost).pipe(
                        map((blogpost) => {
                            snack.open("Blogpost added successfully!", "Close", { duration: 3000 });
                            router.navigate(['admin/blogposts']);
                            return addBlogpostSuccess({ blogpost })
                        }),
                        catchError((error) => {
                            snack.open("Failed to add blogpost", "Close", { duration: 3000 });
                            return of(addBlogpostFailure({ error }))
                        })
                    )
                )
            ),
        { functional: true }
    ),

    updateBlogpost$: createEffect(
        (
            action$ = inject(Actions),
            blogService = inject(BlogpostService),
            snack = inject(MatSnackBar),
            router = inject(Router)
        ) =>
            action$.pipe(
                ofType(updateBlogpost),
                switchMap((action) =>
                    blogService.updateBlogpost(action.id, action.blogpost).pipe(
                        map((blogpost) => {
                            snack.open("Blogpost updated successfully!", "Close", { duration: 3000 });
                            router.navigate(['admin/blogposts']);
                            return updateBlogpostSuccess({ blogpost })
                        }),
                        catchError((error) => {
                            snack.open("Failed to update blogpost", "Close", { duration: 3000 });
                            return of(updateBlogpostFailure({ error }))
                        })
                    )
                )
            ),
        { functional: true }
    ),

    deleteBlogpost$: createEffect(
        (
            action$ = inject(Actions),
            blogService = inject(BlogpostService),
            snack = inject(MatSnackBar),
            router = inject(Router)
        ) =>
            action$.pipe(
                ofType(deleteBlogpost),
                switchMap((action) =>
                    blogService.deleteBlogpost(action.id).pipe(
                        map((blogpost) => {
                            snack.open("Blogpost deleted!", "Close", { duration: 3000 });
                            router.navigate(['admin/blogposts']);
                            return deleteBlogpostSuccess({ blogpost })
                        }),
                        catchError((error) => {
                            snack.open("Failed to delete blogpost", "Close", { duration: 3000 });
                            return of(deleteBlogpostFailure({ error }))
                        })
                    )
                )
            ),
        { functional: true }
    )
}