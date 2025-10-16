import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

export const getCompleteDate = (date: string) => {
    dayjs.locale('pt-br');
    return dayjs(date).format('DD [de] MMMM [de] YYYY');
};
