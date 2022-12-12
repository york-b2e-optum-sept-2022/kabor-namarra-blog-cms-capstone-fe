import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsBlogsComponent } from './accounts-blogs.component';

describe('AccountsBlogsComponent', () => {
  let component: AccountsBlogsComponent;
  let fixture: ComponentFixture<AccountsBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsBlogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountsBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
