import { Module } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Budget } from '../entities/budget.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Budget])],
  providers: [BudgetService],
  controllers: [BudgetController],
})
export class BudgetModule {}
