import { Component, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentInput } from './user-input-model';
import { UserInputService } from './user-input-service';

@Component({
  selector: 'app-user-input',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './user-input.html',
  styleUrl: './user-input.css',
})
export class UserInput {
  caculate = output<InvestmentInput>();
  private userInputService = inject(UserInputService);

  initialInvestment = signal('0');
  annualInvestment = signal('0');
  expectedReturn = signal('5');
  duration = signal('10');

  onSubmit() {
    this.userInputService.calculateInvestmentResults({
      initialInvestment: +this.initialInvestment(),
      annualInvestment: +this.annualInvestment(),
      expectedReturn: +this.expectedReturn(),
      duration: +this.duration(),
    });

    this.initialInvestment.set('0');
    this.annualInvestment.set('0');
    this.expectedReturn.set('5');
    this.duration.set('10');
  }
}
