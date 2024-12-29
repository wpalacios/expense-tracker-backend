import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ExchangeService {
  private readonly api =
    'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1';

  constructor(private readonly httpService: HttpService) {}

  async getExchangeRate(toCurrency: string): Promise<number> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.api}/currencies/usd.json`),
      );
      const rates = response.data.usd;
      if (rates?.[toCurrency]) {
        return rates[toCurrency];
      }
      throw new Error(`Exchange rate for ${toCurrency} not found`);
    } catch (error) {
      throw new Error(`Error fetching exchange rate: ${error.message}`);
    }
  }

  async convertToUSD(amount: number, fromCurrency: string): Promise<number> {
    if (fromCurrency === 'usd') {
      return amount;
    }

    const rate = await this.getExchangeRate(fromCurrency);
    return amount / rate;
  }

  async getAllCurrencies(): Promise<{ [key: string]: string }[]> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.api}/currencies.json`),
      );

      if (response.data) return response.data;

      throw new Error(`Unable to fetch currencies`);
    } catch (error) {
      throw new Error(`Unable to fetch currencies: ${error.message}`);
    }
  }
}
