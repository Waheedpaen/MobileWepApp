import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileEditComponent } from './mobile-edit.component';

describe('MobileEditComponent', () => {
  let component: MobileEditComponent;
  let fixture: ComponentFixture<MobileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
