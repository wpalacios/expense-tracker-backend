import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SetBudgetDto } from 'src/dto/set-budget.dto';
import { UpdateBudgetDto } from 'src/dto/update-budget.dto';
import { Budget } from 'src/entities/budget.entity';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { BudgetService } from './budget.service';

@Controller('budget')
@UseGuards(JwtAuthGuard)
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Get()
  async getBudget(@Request() req): Promise<Budget | null> {
    const userId = req.user.sub;
    return this.budgetService.getBudget(userId);
  }

  @Post()
  async setBudget(
    @Body() setBudgetDto: SetBudgetDto,
    @Request() req,
  ): Promise<Budget> {
    const userId = req.user.sub;

    return this.budgetService.createBudget(
      userId,
      setBudgetDto.amount,
      setBudgetDto.currency,
    );
  }

  @Put(':id')
  async updateBudget(
    @Param('id') id: number,
    @Body() updateBudgetDto: UpdateBudgetDto,
    @Request() req,
  ): Promise<Budget> {
    return this.budgetService.updateBudget(id, updateBudgetDto);
  }
}
