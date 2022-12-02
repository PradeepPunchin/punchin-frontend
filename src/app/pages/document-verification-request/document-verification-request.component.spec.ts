import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentVerificationRequestComponent } from './document-verification-request.component';

describe('DocumentVerificationRequestComponent', () => {
  let component: DocumentVerificationRequestComponent;
  let fixture: ComponentFixture<DocumentVerificationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentVerificationRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentVerificationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
