import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from '../entities/expense.entity';
import { Repository } from 'typeorm';
import { Budget } from 'src/entities/budget.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expensesRepository: Repository<Expense>,
    @InjectRepository(Budget)
    private readonly budgetRepository: Repository<Budget>,
  ) {}

  async createExpense(
    userId: number,
    budgetId: number,
    data: Partial<Expense>,
  ): Promise<Expense> {
    const budget = await this.budgetRepository.findOne({
      where: { id: budgetId },
    });
    if (!budget) {
      throw new Error('Budget not found');
    }
    const expense = new Expense();
    expense.amount = data.amount;
    expense.currency = data.currency;
    expense.date = new Date();
    expense.description = data.description;
    expense.usdAmount = data.usdAmount;
    expense.budget = budget;
    expense.userId = data.userId;
    return await this.expensesRepository.save(expense);
  }

  async getExpenses(budgetId: number): Promise<Expense[]> {
    const expenses = await this.expensesRepository.find({
      where: {
        budget: { id: budgetId },
        // userId: userId,
      },
    });

    return expenses;
  }
}
