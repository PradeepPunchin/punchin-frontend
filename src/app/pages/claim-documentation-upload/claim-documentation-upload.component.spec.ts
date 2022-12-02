import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimDocumentationUploadComponent } from './claim-documentation-upload.component';

describe('ClaimDocumentationUploadComponent', () => {
  let component: ClaimDocumentationUploadComponent;
  let fixture: ComponentFixture<ClaimDocumentationUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimDocumentationUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimDocumentationUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
