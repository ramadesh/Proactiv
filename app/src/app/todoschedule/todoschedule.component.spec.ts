import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoscheduleComponent } from './todoschedule.component';

describe('TodoscheduleComponent', () => {
  let component: TodoscheduleComponent;
  let fixture: ComponentFixture<TodoscheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoscheduleComponent]
    });
    fixture = TestBed.createComponent(TodoscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
