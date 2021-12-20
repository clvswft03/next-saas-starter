import format from 'date-fns/format';

export default function formatDate(date: number | Date) {
  return format(date, 'do MMMM yyyy');
}
