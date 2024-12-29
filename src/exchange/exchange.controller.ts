import { Controller, Get, Query } from '@nestjs/common';
import { ExchangeService } from './exchange.service';

@Controller('exchange')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Get('rate')
  async getExchangeRate(
    @Query('to') toCurrency: string,
  ): Promise<{ rate: number }> {
    const rate = await this.exchangeService.getExchangeRate(toCurrency);
    return { rate };
  }

  @Get('usd')
  async convertToUSD(
    @Query('amount') amount: number,
    @Query('currency') fromCurrency: string,
  ): Promise<{ convertedAmount: number }> {
    const convertedAmount = await this.exchangeService.convertToUSD(
      amount,
      fromCurrency,
    );
    return { convertedAmount };
  }

  @Get('currencies')
  async getCurrencies(): Promise<{ [key: string]: string }[]> {
    const currencies = await this.exchangeService.getAllCurrencies();
    return currencies;
  }
}
