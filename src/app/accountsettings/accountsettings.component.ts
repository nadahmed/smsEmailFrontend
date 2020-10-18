import { AuthService } from './../api/auth/auth.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-accountsettings',
    templateUrl: './accountsettings.component.html',
    styleUrls: ['./accountsettings.component.scss']
})
export class AccountsettingsComponent implements OnDestroy {

    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public auth: AuthService) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this.mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    }

    mobileQuery: MediaQueryList;

    private mobileQueryListener: () => void;

    ngOnDestroy(): void {
        this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
    }

}
