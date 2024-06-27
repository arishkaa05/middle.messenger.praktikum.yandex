import Block from '../Block';
import ChatItem from './ChatItem';

class PageWithList extends Block {
    constructor() {
        super({
            lists: [
                new ChatItem({
                    name: 'Андрей',
                    time: '10:54',
                    isMe: true,
                    message: 'Изображение',
                    count: 1,
                }),
                new ChatItem({
                    name: 'Елена',
                    time: '11:23',
                    isMe: false,
                    message: 'Привет!',
                    count: 2,
                }),
                new ChatItem({
                    name: 'Максим',
                    time: '14:07',
                    isMe: true,
                    message: 'Как дела?',
                    count: 1,
                }),
                new ChatItem({
                    name: 'Ольга',
                    time: '16:45',
                    isMe: false,
                    message: 'Отлично, а у тебя?',
                    count: 3,
                }),
                new ChatItem({
                    name: 'Иван',
                    time: '09:30',
                    isMe: true,
                    message: 'Загружаю файл...',
                    count: 1,
                }),
                new ChatItem({
                    name: 'Дмитрий',
                    time: '13:48',
                    isMe: true,
                    message: 'Это важно. Давай обсудим',
                    count: 1,
                }),
                new ChatItem({
                    name: 'Екатерина',
                    time: '22:15',
                    isMe: false,
                    message: 'Хорошо, я на связи.',
                    count: 4,
                }),
            ],
        });
    }

    override render() {
        return '<div>{{{ lists }}}</div>';
    }
}
export default PageWithList;
