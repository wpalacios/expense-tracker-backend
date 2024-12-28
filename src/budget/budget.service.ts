import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Budget } from '../entities/budget.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget)
    private budgetRepository: Repository<Budget>,
  ) {}

  async createBudget(
    userId: number,
    amount: number,
    currency: string,
  ): Promise<Budget> {
    const budget = this.budgetRepository.create({ userId, amount, currency });
    return this.budgetRepository.save(budget);
  }

  async getBudget(userId: number): Promise<Budget> {
    return this.budgetRepository.findOne({ where: { userId } });
  }
}
