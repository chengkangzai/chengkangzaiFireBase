import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NgrokPage } from './ngrok.component';

describe('Tab1Page', () => {
  let component: NgrokPage;
  let fixture: ComponentFixture<NgrokPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgrokPage],
      imports: []
    }).compileComponents();

    fixture = TestBed.createComponent(NgrokPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
