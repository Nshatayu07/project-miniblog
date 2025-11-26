import { blogpostReducer } from "../features/blogpost/state/blogpost.reducer";
import { blogpostEffects } from "../features/blogpost/state/blogpost.effects";
import { categoryReducer } from "../features/category/state/category.reducer";
import { categoryEffects } from "../features/category/state/category.effects";

export const blogpostFeature = {
    name: 'blogpost',
    reducer: blogpostReducer,
    effects: blogpostEffects
};

export const categoryFeature = {
    name: 'category',
    reducer: categoryReducer,
    effects: categoryEffects
}