import { countryCodes } from '../config/constants';

export const moneyFormat = (value: number) => {
  const userCountry = 'Costa Rica';
  const data = countryCodes.find(
    (countryCode) => countryCode.country === userCountry
  );
  const currency: string = (data?.currency as string) || 'CRC';
  const langCountry: string = (data?.langCountry as string) || 'es-CR';

  const formatter = new Intl.NumberFormat(langCountry, {
    style: 'currency',
    currency,
  });
  return formatter.format(value);
};

export const formatNumber = (number: number) => {
  return new Intl.NumberFormat('es-CR', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

export const formatDate = (date: string | Date) => {
  const dateObject = new Date(date);

  const day = dateObject.getDate() + 1;
  const month = dateObject.getMonth() + 1; // Los meses van de 0 a 11, por eso se suma 1
  const year = dateObject.getFullYear();
  return `${day}-${month}-${year}`;
};
