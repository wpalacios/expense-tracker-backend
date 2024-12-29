import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateBudgetDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  id: string;
}
