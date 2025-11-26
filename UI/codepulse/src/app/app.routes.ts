import { Routes } from '@angular/router';
import { CategroyListComponent } from './features/category/categroy-list/categroy-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { BlogpostListComponent } from './features/blogpost/blogpost-list/blogpost-list.component';
import { AddEditBlogpostComponent } from './features/blogpost/add-edit-blogpost/add-edit-blogpost.component';
import { HomeComponent } from './features/home/home.component';
import { BlogpostComponent } from './features/blogpost/blogpost/blogpost.component';

export const routes: Routes = [
    {
        path: '',   
        component: HomeComponent
    },
    {
        path: 'admin/categories',
        component: CategroyListComponent
    },
    {
        path: 'admin/categories/add',
        component: AddCategoryComponent
    }, 
    {
        path: 'admin/categories/edit/:id',
        component: AddCategoryComponent
    },
    {
        path: 'admin/blogposts',
        component: BlogpostListComponent
    },
    {
        path: 'admin/blogposts/add',
        component: AddEditBlogpostComponent
    },
    {
        path: 'admin/blogposts/edit/:id',
        component: AddEditBlogpostComponent
    },
    {
        path: 'blog/:url',
        component: BlogpostComponent
    }
];
        