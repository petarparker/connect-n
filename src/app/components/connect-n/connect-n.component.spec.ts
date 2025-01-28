import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectNComponent } from './connect-n.component';

describe('FourInARowComponent', () => {
  let component: ConnectNComponent;
  let fixture: ComponentFixture<ConnectNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectNComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
