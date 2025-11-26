import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBlogpostComponent } from './add-edit-blogpost.component';

describe('AddEditBlogpostComponent', () => {
  let component: AddEditBlogpostComponent;
  let fixture: ComponentFixture<AddEditBlogpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditBlogpostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditBlogpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
