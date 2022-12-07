import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentVerificationRequestModalComponent } from './document-verification-request-modal.component';

describe('DocumentVerificationRequestModalComponent', () => {
  let component: DocumentVerificationRequestModalComponent;
  let fixture: ComponentFixture<DocumentVerificationRequestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentVerificationRequestModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentVerificationRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
