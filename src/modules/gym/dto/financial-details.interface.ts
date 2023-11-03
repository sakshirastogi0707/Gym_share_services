import { GymProfileFinancialAchDetailsRequestDto } from './gym-profile-financial-ach-details-request.dto';
import { GymProfileFinancialCreditCardRequestDto } from './gym-profile-financial-credit-card-details-request.dto';

export type FinancialDetails =
  | GymProfileFinancialCreditCardRequestDto
  | GymProfileFinancialAchDetailsRequestDto;
