import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddjournalentryComponent } from './addjournalentry.component';

describe('AddjournalentryComponent', () => {
  let component: AddjournalentryComponent;
  let fixture: ComponentFixture<AddjournalentryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddjournalentryComponent]
    });
    fixture = TestBed.createComponent(AddjournalentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
