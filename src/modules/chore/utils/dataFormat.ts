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

  // Obtener el día, mes y año
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1; // Los meses van de 0 a 11
  const year = dateObject.getFullYear();

  // Formatear el día y el mes para que siempre tengan dos dígitos
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  // Retornar en formato dd-mm-yyyy
  return `${formattedDay}-${formattedMonth}-${year}`;
};
