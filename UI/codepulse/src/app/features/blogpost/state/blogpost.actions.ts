import { createAction, props } from "@ngrx/store";
import { BlogPost } from "../models/blogpost.model";

export const laodBlogposts = createAction('[Blogpost] Laod Blogposts');

export const laodBlogpostSuccess = createAction(
    '[Blogpost] Load Blogpost Success',
    props<{ blogposts: BlogPost[] }>()
);

export const laodBlogpostFailure = createAction(
    '[Blogpost] Load Blogpost Failure',
    props<{ error: string }>()
);

export const loadBlogpostByUrl = createAction(
    '[Blogpost] Load Blogpost By Url',
    props<{ url: string }>()
);

export const laodBlogpostByUrlSuccess = createAction(
    '[Blogpost] Load Blogpost By Url Success',
    props<{ blogpost: BlogPost }>()
);

export const laodBlogpostByUrlFailure = createAction(
    '[Blogpost] Load Blogpost By Url Failure',
    props<{ error: string }>()
);

export const loadBlogpostById = createAction(
    '[Blogpost] Load Blogpost By Id',
    props<{ id: string }>()
);

export const laodBlogpostByIdSuccess = createAction(
    '[Blogpost] Load Blogpost By Id Success',
    props<{ blogpost: BlogPost }>()
);

export const laodBlogpostByIdFailure = createAction(
    '[Blogpost] Load Blogpost By Id Failure',
    props<{ error: string }>()
);

export const addBlogpost = createAction(
    '[Blogpost] Add BlogPost',
    props<{ blogpost: BlogPost }>()
);

export const addBlogpostSuccess = createAction(
    '[Blogpost] Add BLogPost Success',
    props<{ blogpost: BlogPost }>()
);

export const addBlogpostFailure = createAction(
    '[Blogpost] Add BlogPost Failure',
    props<{ error: string }>()
);

export const updateBlogpost = createAction(
    '[Blogpost] Update BlogPost',
    props<{ id: string, blogpost: BlogPost }>()
);

export const updateBlogpostSuccess = createAction(
    '[Blogpost] Update BLogPost Success',
    props<{ blogpost: BlogPost }>()
);

export const updateBlogpostFailure = createAction(
    '[Blogpost] Update BlogPost Failure',
    props<{ error: string }>()
);

export const deleteBlogpost = createAction(
    '[Blogpost] Delete BlogPost',
    props<{ id: string }>()
);

export const deleteBlogpostSuccess = createAction(
    '[Blogpost] Delete BLogPost Success',
    props<{ blogpost: BlogPost }>()
);

export const deleteBlogpostFailure = createAction(
    '[Blogpost] Delete BlogPost Failure',
    props<{ error: string }>()
);