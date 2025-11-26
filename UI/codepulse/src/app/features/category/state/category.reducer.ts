import { createReducer, on } from "@ngrx/store";
import { Category } from "../models/category.model";
import { addCategories, addCategoriesFailure, addCategoriesSuccess, deleteCategories, deleteCategoriesFailure, deleteCategoriesSuccess, laodCategoriesByIdSuccess, loadCategories, loadCategoriesById, loadCategoriesFailure, loadCategoriesSuccess, updateCategories, updateCategoriesFailure, updateCategoriesSuccess } from "./category.actions";

export interface CategoryState {
    categories: Category[];
    selectedCategory: Category;
    isLoading: boolean;
    isSaving: boolean;
    error: string | null;
};

export const initialState: CategoryState = {
    categories: [],
    selectedCategory: {} as Category,
    isLoading: false,
    isSaving: false,
    error: null
}

export const categoryReducer = createReducer(
    initialState,

    on(loadCategories, (state: CategoryState) => ({
        ...state,
        isLoading: true,
        error: null
    })),

    on(loadCategoriesSuccess, (state: CategoryState, { categories }) => ({
        ...state,
        categories,
        isLoading: false,
        error: null,
    })),

    on(loadCategoriesFailure, (state: CategoryState, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),

    on(loadCategoriesById, (state: CategoryState) => ({
        ...state,
        isLoading: true,
        error: null
    })),

    on(laodCategoriesByIdSuccess, (state: CategoryState, { category }) => ({
        ...state,
        selectedCategory: category,
        isLoading: false,
        error: null
    })),

    on(loadCategoriesFailure, (state: CategoryState, { error }) => ({
        ...state,
        isLoading: false,
        selectedCategory: {} as any,
        error
    })),

    on(addCategories, (state: CategoryState) => ({
        ...state,
        isSaving: true,
        error: null
    })),

    on(addCategoriesSuccess, (state: CategoryState, { category }) => ({
        ...state,
        isSaving: false,
        selectedCategory: category,
        categories: [...state.categories, category],
        error: null
    })),

    on(addCategoriesFailure, (state: CategoryState, { error }) => ({
        ...state,
        isSaving: false,
        error
    })),

    on(updateCategories, (state: CategoryState) => ({
        ...state,
        isLoading: true,
        isSaving: true,
        error: null
    })),

    on(updateCategoriesSuccess, (state: CategoryState, { category }) => ({
        ...state,
        isLoading: false,
        isSaving: false,
        selectedCategory: category,
        categories: state.categories.map(record =>
            record.id === category.id ? category : record
        ),
        error: null
    })),

    on(updateCategoriesFailure, (state: CategoryState, { error }) => ({
        ...state,
        isLoading: false,
        isSaving: false,
        error
    })),

    on(deleteCategories, (state: CategoryState) => ({
        ...state,
        isLoading: true,
        isSaving: true,
        error: null
    })),

    on(deleteCategoriesSuccess, (state: CategoryState, { category }) => ({
        ...state,
        isLoading: false,
        isSaving: false,
        selectedCategory: category,
        categories: state.categories.filter(record => record.id !== category.id),
        error: null
    })),

    on(deleteCategoriesFailure, (state: CategoryState, { error }) => ({
        ...state,
        isLoading: false,
        isSaving: false,
        error
    })),
)   