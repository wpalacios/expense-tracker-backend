import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from '../entities/expense.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private expensesRepository: Repository<Expense>,
  ) {}

  async createExpense(
    userId: number,
    data: Partial<Expense>,
  ): Promise<Expense> {
    const expense = this.expensesRepository.create({ userId, ...data });
    return this.expensesRepository.save(expense);
  }

  async getExpenses(userId: number): Promise<Expense[]> {
    return this.expensesRepository.find({ where: { userId } });
  }
}
