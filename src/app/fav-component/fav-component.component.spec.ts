import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavComponentComponent } from './fav-component.component';

describe('FavComponentComponent', () => {
  let component: FavComponentComponent;
  let fixture: ComponentFixture<FavComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
