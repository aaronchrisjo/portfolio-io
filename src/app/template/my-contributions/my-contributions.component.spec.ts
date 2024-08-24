import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyContributionsComponent } from './my-contributions.component';

describe('MyContributionsComponent', () => {
  let component: MyContributionsComponent;
  let fixture: ComponentFixture<MyContributionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyContributionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyContributionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
