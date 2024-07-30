export function getNextPaymentDate(currentDateString: string | Date): string {
  const currentDate = new Date(currentDateString);

  // Obtener el día actual
  const currentDay = currentDate.getDate();

  // Ajustar al próximo mes
  currentDate.setMonth(currentDate.getMonth() + 1);

  // Ajustar al día deseado, o al último día del mes si no existe ese día
  currentDate.setDate(currentDay);
  if (currentDate.getDate() !== currentDay) {
    // Si el día ajustado es diferente, significa que el mes no tiene ese día
    currentDate.setDate(0); // Esto ajusta al último día del mes anterior
  }

  return currentDate.toISOString();
}
