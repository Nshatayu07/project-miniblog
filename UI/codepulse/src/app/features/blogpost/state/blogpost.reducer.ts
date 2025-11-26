import { createReducer, on } from "@ngrx/store";
import { BlogPost } from "../models/blogpost.model";
import {
    addBlogpost, addBlogpostFailure, addBlogpostSuccess, deleteBlogpost, 
    deleteBlogpostFailure, deleteBlogpostSuccess, laodBlogpostByIdFailure, 
    laodBlogpostByIdSuccess, laodBlogpostByUrlFailure, laodBlogpostByUrlSuccess,
    laodBlogpostFailure, laodBlogposts, laodBlogpostSuccess, loadBlogpostById,
    loadBlogpostByUrl, updateBlogpost, updateBlogpostFailure, updateBlogpostSuccess
} from "./blogpost.actions";

export interface BlogpostState {
    blogposts: BlogPost[];
    currentBlogpost: BlogPost;
    isLoading: boolean;
    isSaving: boolean;
    error: string | null;
}

export const initialState: BlogpostState = {
    blogposts: [],
    currentBlogpost: {} as any,
    isLoading: false,
    isSaving: false,
    error: null
}

export const blogpostReducer = createReducer(
    initialState,

    on(laodBlogposts, (state: BlogpostState) => ({
        ...state,
        isLoading: true,
        error: null
    })),

    on(laodBlogpostSuccess, (state: BlogpostState, { blogposts }) => ({
        ...state,
        blogposts,
        isLoading: false,
        error: null,
    })),

    on(laodBlogpostFailure, (state: BlogpostState, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),

    on(loadBlogpostByUrl, (state: BlogpostState) => ({
        ...state,
        isLoading: true,
        error: null
    })),

    on(laodBlogpostByUrlSuccess, (state: BlogpostState, { blogpost }) => ({
        ...state,
        currentBlogpost: blogpost,
        isLoading: false,
        error: null
    })),

    on(laodBlogpostByUrlFailure, (state: BlogpostState, { error }) => ({
        ...state,
        isLoading: false,
        currentBlogpost: {} as any,
        error
    })),
    
    on(loadBlogpostById, (state: BlogpostState) => ({
        ...state,
        isLoading: true,
        error: null
    })),

    on(laodBlogpostByIdSuccess, (state: BlogpostState, { blogpost }) => ({
        ...state,
        currentBlogpost: blogpost,
        isLoading: false,
        error: null
    })),

    on(laodBlogpostByIdFailure, (state: BlogpostState, { error }) => ({
        ...state,
        isLoading: false,
        currentBlogpost: {} as any,
        error
    })),

    on(addBlogpost, (state: BlogpostState) => ({
        ...state,
        isSaving: true,
        error: null
    })),

    on(addBlogpostSuccess, (state: BlogpostState, { blogpost }) => ({
        ...state,
        isSaving: false,
        currentBlogpost: blogpost,
        blogposts: [...state.blogposts, blogpost],
        error: null
    })),

    on(addBlogpostFailure, (state: BlogpostState, { error }) => ({
        ...state,
        isSaving: false,
        error
    })),

    on(updateBlogpost, (state: BlogpostState) => ({
        ...state,
        isLoading: true,
        isSaving: true,
        error: null
    })),

    on(updateBlogpostSuccess, (state: BlogpostState, { blogpost }) => ({
        ...state,
        isLoading: false,
        isSaving: false,
        currentBlogpost: blogpost,
        blogposts: state.blogposts.map(record =>
            record.id === blogpost.id ? blogpost : record
        ),
        error: null
    })),

    on(updateBlogpostFailure, (state: BlogpostState, { error }) => ({
        ...state,
        isLoading: false,
        isSaving: false,
        error
    })),

    on(deleteBlogpost, (state: BlogpostState) => ({
        ...state,
        isLoading: true,
        isSaving: true,
        error: null
    })),

    on(deleteBlogpostSuccess, (state: BlogpostState, { blogpost }) => ({
        ...state,
        isLoading: false,
        isSaving: false,
        currentBlogpost: blogpost,
        blogposts: state.blogposts.filter(record => record.id !== blogpost.id),
        error: null
    })),

    on(deleteBlogpostFailure, (state: BlogpostState, { error }) => ({
        ...state,
        isLoading: false,
        isSaving: false,
        error
    })),
)