import Block from '../Block';
import Message from './Message';

class MessageList extends Block {
    constructor() {
        super({
            messages: [
                new Message({ isOwn: false, message: 'Привет! Как дела?', time: '10.43' }),
                new Message({ isOwn: true, message: 'Привет! У меня все хорошо, а у тебя?', time: '10.45' }),
                new Message({ isOwn: false, message: 'Тоже отлично, спасибо! Как планы на выходные?', time: '10.46' }),
                new Message({ isOwn: true, message: 'В субботу - свободен. Как тебе?', time: '10.48' }),
                new Message({ isOwn: false, message: 'В субботу - отлично! Давай встретимся?', time: '10.51' }),
                new Message({ isOwn: true, message: 'Давай! Где ты думаешь?', time: '11.03' }),
                new Message({ isOwn: false, message: 'Может, в кино сходим? Новый фильм про супергероев вышел.', time: '11.23' }),
                new Message({ isOwn: true, message: 'Звучит отлично! Я за!', time: '11.27' }),
                new Message({ isOwn: false, message: 'Тогда в 19:00 у кинотеатра?', time: '11.32' }),
                new Message({ isOwn: true, message: 'Отлично! До встречи!', time: '11.34' }),
            ],
        });
    }

    override render() {
        return "<div class='message-page__list'>{{{ messages }}}</div>";
    }
}
export default MessageList;
