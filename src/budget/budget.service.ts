import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Budget } from '../entities/budget.entity';
import { Repository } from 'typeorm';
import { UpdateBudgetDto } from 'src/dto/update-budget.dto';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget)
    private readonly budgetRepository: Repository<Budget>,
  ) {}

  async createBudget(
    userId: number,
    amount: number,
    currency: string,
  ): Promise<Budget> {
    const budget = this.budgetRepository.create({ userId, amount, currency });
    return this.budgetRepository.save(budget);
  }

  async updateBudget(
    id: number,
    updateBudgetDto: UpdateBudgetDto,
  ): Promise<Budget> {
    const budget = await this.budgetRepository.findOne({ where: { id } });

    if (!budget) {
      throw new NotFoundException(`Budget with ID ${id} not found`);
    }

    Object.assign(budget, updateBudgetDto);
    return this.budgetRepository.save(budget);
  }

  async getBudget(userId: number): Promise<Budget> {
    return this.budgetRepository.findOne({ where: { userId } });
  }
}
