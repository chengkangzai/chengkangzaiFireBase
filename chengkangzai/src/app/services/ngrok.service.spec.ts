import {TestBed} from '@angular/core/testing';

import {NgrokService} from './ngrok.service';

describe('NgrokService', () => {
    let service: NgrokService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(NgrokService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
