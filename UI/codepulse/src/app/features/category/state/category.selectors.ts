import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CategoryState } from "./category.reducer";

export const getCategoryState = createFeatureSelector<CategoryState>('category');

export const getCategories = createSelector(
    getCategoryState,
    (state: CategoryState) => state.categories
);

export const getIsLoading = createSelector(
    getCategoryState,
    (state: CategoryState) => state.isLoading
);

export const getIsSaving = createSelector(
    getCategoryState,
    (state: CategoryState) => state.isSaving
);

export const getError = createSelector(
    getCategoryState,
    (state: CategoryState) => state.error
);

export const getSelectedCategory = createSelector(
    getCategoryState,
    (state: CategoryState) => state.selectedCategory
)