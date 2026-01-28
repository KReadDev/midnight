import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteView } from './site-view';

describe('SiteView', () => {
  let component: SiteView;
  let fixture: ComponentFixture<SiteView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
