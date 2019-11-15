import intl from 'intl';

export const { format: formatPriceBrl } = new intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});
