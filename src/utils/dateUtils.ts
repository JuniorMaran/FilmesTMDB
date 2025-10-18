import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

export const formatDate = (date: string, format: string = 'DD/MM/YYYY') => {
    dayjs.locale('pt-br');
    return dayjs(date).format(format);
};