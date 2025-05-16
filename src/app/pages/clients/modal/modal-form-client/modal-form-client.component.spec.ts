import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormClientComponent } from './modal-form-client.component';

describe('ModalFormClientComponent', () => {
  let component: ModalFormClientComponent;
  let fixture: ComponentFixture<ModalFormClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalFormClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFormClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
