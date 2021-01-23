import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgrokPage} from './ngrok.page';

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
