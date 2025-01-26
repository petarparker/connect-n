import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourInARowComponent } from './connect-n.component';

describe('FourInARowComponent', () => {
  let component: FourInARowComponent;
  let fixture: ComponentFixture<FourInARowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourInARowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourInARowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
