import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { TuiFileLike } from '@taiga-ui/kit';
import { filter, tap } from 'rxjs';
import { ExaminationDataImportStore } from './import.store';

@Component({
  selector: 'esm-examination-data-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ExaminationDataImportStore],
})
export class ExaminationDataImportComponent {
  // OUTPUT
  @Output() uploadSuccess = new EventEmitter<void>();

  // PUBLIC PROPERTIES
  file: TuiFileLike | null = null;
  readonly status$ = this.store.status$;

  // CONSTRUCTOR
  constructor(private readonly store: ExaminationDataImportStore) {
    this.handleUploadSuccess();
  }

  // PUBLIC METHODS
  removeFile(): void {
    this.file = null;
  }

  clearRejected(): void {
    this.removeFile();
    this.store.clearRejected();
  }

  importFile(file: File): void {
    const formData = new FormData();
    formData.append('file', file);
    this.store.import(formData);
  }

  // PRIVATE METHODS
  private handleUploadSuccess(): void {
    this.status$
      .pipe(
        filter((s) => s === 'success'),
        tap(() => this.store.reloadExamination())
      )
      .subscribe();
  }
}
