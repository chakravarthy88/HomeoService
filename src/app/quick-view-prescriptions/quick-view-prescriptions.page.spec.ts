import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuickViewPrescriptionsPage } from './quick-view-prescriptions.page';

describe('QuickViewPrescriptionsPage', () => {
  let component: QuickViewPrescriptionsPage;
  let fixture: ComponentFixture<QuickViewPrescriptionsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickViewPrescriptionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuickViewPrescriptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
