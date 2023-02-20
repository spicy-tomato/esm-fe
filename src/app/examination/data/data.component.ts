import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { tuiButtonOptionsProvider } from '@taiga-ui/core';
import { TuiFileLike } from '@taiga-ui/kit';
import { filter, tap } from 'rxjs';
import { ExaminationDataStore } from './data.store';

@Component({
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ExaminationDataStore, tuiButtonOptionsProvider({ size: 'm' })],
})
export class ExaminationDataComponent implements OnInit {
  // PUBLIC PROPERTIES
  file: TuiFileLike | null = null;
  disableReload = true;
  readonly data$ = this.store.data$;
  readonly dataStatus$ = this.store.dataStatus$;
  readonly uploadStatus$ = this.store.uploadStatus$;
  readonly uploadError$ = this.store.uploadError$;

  // CONSTRUCTOR
  constructor(private readonly store: ExaminationDataStore) {
    this.handleUploadSuccess();
  }

  // LIFECYCLE
  ngOnInit(): void {
    this.getData();
  }

  // PUBLIC METHODS
  getData(): void {
    this.store.getData();
  }

  removeFile(): void {
    this.file = null;
  }

  clearRejected(): void {
    this.removeFile();
    this.store.clearRejected();
  }

  makeRequest(file: File): void {
    const formData = new FormData();
    formData.append('file', file);
    this.store.import(formData);
  }

  onTableChanges(): void {
    this.disableReload = false;
  }

  // PRIVATE METHODS
  private handleUploadSuccess(): void {
    this.uploadStatus$
      .pipe(
        filter((s) => s === 'success'),
        tap(() => this.store.getData())
      )
      .subscribe();
  }
}
