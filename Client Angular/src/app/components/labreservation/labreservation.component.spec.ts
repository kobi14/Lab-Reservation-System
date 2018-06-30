import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabreservationComponent } from './labreservation.component';

describe('LabreservationComponent', () => {
  let component: LabreservationComponent;
  let fixture: ComponentFixture<LabreservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabreservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabreservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
