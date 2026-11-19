import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { UpdateStatusDialogComponent } from './update-status-dialog';

describe('UpdateStatusDialogComponent', () => {
  let component: UpdateStatusDialogComponent;
  let fixture: ComponentFixture<UpdateStatusDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateStatusDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => undefined } },
        { provide: MAT_DIALOG_DATA, useValue: { status: '' } }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateStatusDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
