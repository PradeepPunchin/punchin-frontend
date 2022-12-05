import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentRejectModalComponent } from './document-reject-modal.component';

describe('DocumentRejectModalComponent', () => {
  let component: DocumentRejectModalComponent;
  let fixture: ComponentFixture<DocumentRejectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentRejectModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentRejectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
