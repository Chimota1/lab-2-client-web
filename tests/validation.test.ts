import { expect } from 'chai';
import { Validation } from '../src/utils/validator';

describe('Validation Namespace Tests', () => {
  it('isRequired має повертати true для заповненого рядка', () => {
    expect(Validation.isRequired('Гаррі Поттер')).to.be.true;
  });

  it('isRequired має повертати false для порожнього рядка або пробілів', () => {
    expect(Validation.isRequired('')).to.be.false;
    expect(Validation.isRequired('   ')).to.be.false;
  });

  it('isUserIdValid має пропускати тільки цифри', () => {
    expect(Validation.isUserIdValid('1725533394038')).to.be.true;
    expect(Validation.isUserIdValid('123abc456')).to.be.false;
  });

  it('isYearValid має пропускати валідні роки', () => {
    expect(Validation.isYearValid('2024')).to.be.true;
    expect(Validation.isYearValid('1999')).to.be.true;
    expect(Validation.isYearValid('24')).to.be.false; // Замало цифр
  });
});