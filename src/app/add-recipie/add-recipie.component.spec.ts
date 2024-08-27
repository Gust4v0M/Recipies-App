import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecipieComponent } from './add-recipie.component';

describe('AddRecipieComponent', () => {
  let component: AddRecipieComponent;
  let fixture: ComponentFixture<AddRecipieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRecipieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRecipieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
