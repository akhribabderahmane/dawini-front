import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.css']
})
export class ActionButtonsComponent {
  // Inputs for data binding
  @Input() patientId: string | null = null;
  @Input() consultationId: string | null = null;
  @Input() patientNss: string = '';
  @Input() careType: string = '';
  @Input() patientStatus: string = '';

  // Outputs for event binding
  @Output() onSave = new EventEmitter<{
    patientId: string | null;
    consultationId: string | null;
    patientNss: string;
    careType: string;
    patientStatus: string;
  }>();
  @Output() onDiscard = new EventEmitter<void>();

  save(): void {
    // Emit the save event with collected data
    this.onSave.emit({
      patientId: this.patientId,
      consultationId: this.consultationId,
      patientNss: this.patientNss,
      careType: this.careType,
      patientStatus: this.patientStatus
    });
  }

  discard(): void {
    // Emit the discard event
    this.onDiscard.emit();
  }
}
