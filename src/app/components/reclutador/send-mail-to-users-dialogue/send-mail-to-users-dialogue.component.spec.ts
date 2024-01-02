import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMailToUsersDialogueComponent } from './send-mail-to-users-dialogue.component';

describe('SendMailToUsersDialogueComponent', () => {
  let component: SendMailToUsersDialogueComponent;
  let fixture: ComponentFixture<SendMailToUsersDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendMailToUsersDialogueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendMailToUsersDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
