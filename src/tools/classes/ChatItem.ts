
import Block from '../Block';

class ChatItem extends Block {
  constructor({...props}) {
    console.log('chat')
    super({
      ...props,
    })
  }

  render() {
      return `
      <div>
        <div>{{ name }}:{{ message }}</div>
      </div>`;
  }
}

export default ChatItem; 