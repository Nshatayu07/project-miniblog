import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BlogpostState } from "./blogpost.reducer";

export const getBlogpostState = createFeatureSelector<BlogpostState>('blogpost');

export const getBlogposts = createSelector(
    getBlogpostState,
    (state: BlogpostState) => state.blogposts
);

export const getIsLoading = createSelector(
    getBlogpostState,
    (state: BlogpostState) => state.isLoading
);

export const getIsSaving = createSelector(
    getBlogpostState,
    (state: BlogpostState) => state.isSaving
);

export const getError = createSelector(
    getBlogpostState,
    (state: BlogpostState) => state.error
);

export const getCurrentBlogpost = createSelector(
    getBlogpostState,
    (state: BlogpostState) => state.currentBlogpost
)