import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteManga } from './site-manga';

describe('SiteManga', () => {
  let component: SiteManga;
  let fixture: ComponentFixture<SiteManga>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteManga]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteManga);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
