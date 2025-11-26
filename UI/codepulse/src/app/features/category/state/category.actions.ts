import { createAction, props } from "@ngrx/store";
import { Category } from "../models/category.model";

export const loadCategories = createAction('[category] laod all categories');

export const loadCategoriesSuccess = createAction(
    '[category] load categories success',
    props<{ categories: Category[] }>()
);

export const loadCategoriesFailure = createAction(
    '[category] load categories failure',
    props<{ error: string }>()
);

export const loadCategoriesById = createAction(
    '[category] Load Categories By Id',
    props<{ id: string }>()
);

export const laodCategoriesByIdSuccess = createAction(
    '[category] Load Categories By Id Success',
    props<{ category: Category }>()
);

export const laodCategoriesByIdFailure = createAction(
    '[category] Load Categories By Id Failure',
    props<{ error: string }>()
);

export const addCategories = createAction(
    '[category] Add Categories',
    props<{ category: Category }>()
);

export const addCategoriesSuccess = createAction(
    '[category] Add Categories Success',
    props<{ category: Category }>()
);

export const addCategoriesFailure = createAction(
    '[category] Add Categories Failure',
    props<{ error: string }>()
);

export const updateCategories = createAction(
    '[category] Update Categories',
    props<{ id: string, category: Category }>()
);

export const updateCategoriesSuccess = createAction(
    '[category] Update Categories Success',
    props<{ category: Category }>()
);

export const updateCategoriesFailure = createAction(
    '[category] Update Categories Failure',
    props<{ error: string }>()
);

export const deleteCategories = createAction(
    '[category] Delete Categories',
    props<{ id: string }>()
);

export const deleteCategoriesSuccess = createAction(
    '[category] Delete Categories Success',
    props<{ category: Category }>()
);

export const deleteCategoriesFailure = createAction(
    '[category] Delete Categories Failure',
    props<{ error: string }>()
);