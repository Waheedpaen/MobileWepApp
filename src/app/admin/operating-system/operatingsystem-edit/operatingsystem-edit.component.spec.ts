import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatingsystemEditComponent } from './operatingsystem-edit.component';

describe('OperatingsystemEditComponent', () => {
  let component: OperatingsystemEditComponent;
  let fixture: ComponentFixture<OperatingsystemEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatingsystemEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatingsystemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
