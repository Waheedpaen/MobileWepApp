import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileDetailComponent } from './mobile-detail.component';

describe('MobileDetailComponent', () => {
  let component: MobileDetailComponent;
  let fixture: ComponentFixture<MobileDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
