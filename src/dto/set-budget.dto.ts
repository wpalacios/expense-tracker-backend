import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SetBudgetDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  currency: string;
}
