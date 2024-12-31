import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Budget } from './budget.entity';

@Entity("expenses")
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  date: Date;

  @Column()
  description: string;

  @Column()
  currency: string;

  @Column('decimal', { precision: 10, scale: 2 })
  usdAmount: number;

  @ManyToOne(() => Budget, (budget) => budget.expenses)
  budget: Budget;
}
