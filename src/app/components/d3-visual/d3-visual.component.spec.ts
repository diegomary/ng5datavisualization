import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D3VisualComponent } from './d3-visual.component';

describe('D3VisualComponent', () => {
  let component: D3VisualComponent;
  let fixture: ComponentFixture<D3VisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3VisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3VisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
