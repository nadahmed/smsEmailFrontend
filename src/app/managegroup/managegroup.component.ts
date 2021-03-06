import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';


@Component({
    selector: 'app-managegroup',
    templateUrl: './managegroup.component.html',
    styleUrls: ['./managegroup.component.scss']
})
export class ManagegroupComponent implements OnDestroy {

    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this.mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    }

    mobileQuery: MediaQueryList;

    private mobileQueryListener: () => void;

    ngOnDestroy() {
        this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
    }
}
