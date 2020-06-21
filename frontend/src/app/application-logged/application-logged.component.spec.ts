import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationLoggedComponent } from './application-logged.component';

describe('ApplicationLoggedComponent', () => {
  let component: ApplicationLoggedComponent;
  let fixture: ComponentFixture<ApplicationLoggedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationLoggedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
