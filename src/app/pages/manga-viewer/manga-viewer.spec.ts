import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaViewer } from './manga-viewer';

describe('MangaViewer', () => {
  let component: MangaViewer;
  let fixture: ComponentFixture<MangaViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaViewer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangaViewer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
