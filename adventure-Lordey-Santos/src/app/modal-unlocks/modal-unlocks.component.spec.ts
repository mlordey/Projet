import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUnlocksComponent } from './modal-unlocks.component';

describe('ModalUnlocksComponent', () => {
  let component: ModalUnlocksComponent;
  let fixture: ComponentFixture<ModalUnlocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUnlocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUnlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
