import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  currency: string;

  @Column()
  description: string;

  @Column()
  userId: number;

  @Column()
  date: Date;
}
