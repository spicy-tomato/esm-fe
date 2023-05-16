import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_STORE_PROVIDER } from '@esm/cdk';
import { WorkflowDialogComponent } from './workflow.component';

describe('WorkflowDialogComponent', () => {
  let component: WorkflowDialogComponent;
  let fixture: ComponentFixture<WorkflowDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [APP_STORE_PROVIDER],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkflowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
