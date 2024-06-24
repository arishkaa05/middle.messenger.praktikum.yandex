import Block from "../Block";

class ChatItem extends Block {
  props: {
    name: string;
    message: string;
    isMe: boolean;
    time: string;
    count: number;
    [key: string]: number | string | boolean;
  };

  constructor(props: { name: string; message: string; isMe: boolean; time: string; count: number; [key: string]: number | string | boolean }) {
    super(props);
    this.props = props;
  }

  render() {
    const { name, time, message, isMe, count } = this.props;
    let template = "";
    template += `
    <div class="chat-page__list-item">
       <div class="chat-page__user-img"></div>
       <div style="width: 100%">
         <div class="chat-page__user-sent">
           <p class="chat-page__user-name">${name}</p>
           <p class="chat-page__user-time">${time}</p>
         </div>`;
    if (isMe)
      template += `<div class="chat-page__user-msg">
      <div class="chat-page__message">
        <span>Вы:</span>
        ${message} 
      </div> 
    </div>`;
    else
      template += `<div class="chat-page__user-msg">
    <div class="chat-page__message">${message}</div>
    <div class="chat-page__count">${count}</div>
  </div>`;
    template += `</div>
  </div>`;
    return template;
  }
}

export default ChatItem;