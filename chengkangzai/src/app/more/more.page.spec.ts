import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MorePage} from './more.page';

describe('Tab2Page', () => {
    let component: MorePage;
    let fixture: ComponentFixture<MorePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MorePage],
            imports: []
        }).compileComponents();

        fixture = TestBed.createComponent(MorePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
