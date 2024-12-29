import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-observations',
  standalone: true, // Make the component standalone
  imports: [FormsModule], // Add FormsModule to the imports
  templateUrl: './observations.component.html',
  styleUrls: ['./observations.component.css']
})
export class ObservationsComponent {
  @Input() observationText: string = ''; // Bindable property for observations
  @Output() observationTextChange = new EventEmitter<string>(); // Output for two-way binding

  // Triggered when observationText changes
  onObservationChange(value: string): void {
    this.observationText = value;
    this.observationTextChange.emit(value); // Emit changes to the parent
  }
}
