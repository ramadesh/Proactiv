import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastjournalsComponent } from './dashcontent.component';

describe('PastjournalsComponent', () => {
  let component: PastjournalsComponent;
  let fixture: ComponentFixture<PastjournalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PastjournalsComponent]
    });
    fixture = TestBed.createComponent(PastjournalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

