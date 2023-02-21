import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CreateRoomRequest } from '@esm/data';
import {
  TuiAlertService,
  tuiButtonOptionsProvider,
  TuiDialogContext,
  TuiNotification,
} from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { filter, map, tap } from 'rxjs';
import { AddRoomDialogStore } from './add-room.store';

@Component({
  selector: 'esm-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AddRoomDialogStore,
    tuiButtonOptionsProvider({ appearance: 'icon', size: 'm' }),
  ],
})
export class AddRoomDialogComponent implements OnInit {
  // PUBLIC PROPERTIES
  form!: FormGroup<{
    rooms: FormArray<
      FormGroup<{
        displayId: FormControl<string | null>;
        capacity: FormControl<number | null>;
      }>
    >;
  }>;
  shouldUpdate = false;
  readonly columns = ['id', 'roomId', 'capacity', 'action'];
  readonly data$ = this.store.data$;
  readonly status$ = this.store.status$;

  // CONSTRUCTOR
  constructor(
    private readonly fb: FormBuilder,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<boolean, string[]>,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
    private readonly store: AddRoomDialogStore
  ) {}

  // LIFECYCLE
  ngOnInit(): void {
    this.store.init(this.context.data);

    this.handleDataChange();
    this.handleCreateSuccess();
  }

  // PUBLIC METHODS
  public onRemove(rowId: number): void {
    const roomControls = this.form.controls.rooms;

    roomControls.removeAt(rowId);
    if (!roomControls.length) {
      this.context.completeWith(this.shouldUpdate)
    }
  }

  public onCreate(rowId: number): void {
    const params = this.form.getRawValue().rooms[rowId] as CreateRoomRequest;
    this.store.create({ rowId, params });
  }

  // PRIVATE METHODS
  private handleCreateSuccess(): void {
    this.status$
      .pipe(
        map((s) => s.indexOf('success')),
        filter((i) => i !== -1),
        tap((i) => {
          this.shouldUpdate = true;
          this.alertService
            .open('Thêm phòng thành công!', {
              status: TuiNotification.Success,
            })
            .subscribe();
          this.onRemove(i);
        })
      )
      .subscribe();
  }

  private handleDataChange(): void {
    this.data$
      .pipe(
        tap((data) => {
          this.form = this.fb.group({
            rooms: this.fb.array(
              data.map(({ displayId, capacity }) =>
                this.fb.group({
                  displayId: [displayId, Validators.required],
                  capacity: [capacity],
                })
              )
            ),
          });
        })
      )
      .subscribe();
  }
}
