import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryCreator } from './gallery-creator';

describe('GalleryCreator', () => {
  let component: GalleryCreator;
  let fixture: ComponentFixture<GalleryCreator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryCreator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryCreator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
