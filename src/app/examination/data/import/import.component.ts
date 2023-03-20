import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LetModule } from '@ngrx/component';
import { TuiFileLike, TuiInputFilesModule } from '@taiga-ui/kit';
import { filter, tap } from 'rxjs';
import { ExaminationDataImportStore } from './import.store';

export const NGRX = [LetModule];
export const TAIGA_UI = [TuiInputFilesModule];

@Component({
  selector: 'esm-examination-data-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.less'],
  standalone: true,
  imports: [CommonModule, FormsModule, ...NGRX, ...TAIGA_UI],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ExaminationDataImportStore],
})
export class ExaminationDataImportComponent implements OnInit {
  // OUTPUT
  @Output() uploadSuccess = new EventEmitter<void>();

  // PUBLIC PROPERTIES
  file: TuiFileLike | null = null;
  readonly status$ = this.store.status$;

  // CONSTRUCTOR
  constructor(private readonly store: ExaminationDataImportStore) {}

  // LIFECYCLE
  ngOnInit(): void {
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
