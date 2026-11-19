import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ViewIncidentDialogComponent } from './view-incident-dialog';

describe('ViewIncidentDialogComponent', () => {
  let component: ViewIncidentDialogComponent;
  let fixture: ComponentFixture<ViewIncidentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewIncidentDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => undefined } },
        { provide: MAT_DIALOG_DATA, useValue: { complaintId: '' } }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewIncidentDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
