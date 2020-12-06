import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgAnimeDriverComponent } from './ng-anime-driver.component';

describe('NgAnimeDriverComponent', () => {
  let component: NgAnimeDriverComponent;
  let fixture: ComponentFixture<NgAnimeDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgAnimeDriverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgAnimeDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
