import { Component, computed, inject, input, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { UserInputService } from '../user-input/user-input-service';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './investment-results.html',
  styleUrl: './investment-results.css',
})
export class InvestmentResults {
  private userInputService = inject(UserInputService);

  results = computed(() => this.userInputService.resultsData());
}
