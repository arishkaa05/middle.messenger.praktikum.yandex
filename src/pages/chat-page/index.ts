import "./chat-page.scss";
export { default as ChatPage } from "./chat-page.hbs?raw";
import PageWithList from "../../modules/classes/PageWithList";
import UserChat from "../../modules/classes/UserChat";
import MessageList from "../../modules/classes/MessageList";

const observer = new MutationObserver(() => {
  const container = document.querySelector(".chat-page__list");
  const noMessageBlock = document.getElementById("no-message-block");
  const messageBlock = document.getElementById("message-block");
  const userMessageBlock = document.getElementById("user-message-block");
  if (container) {
    observer.disconnect();
    const block = new PageWithList();
    if (block) {
      const content = block.getContent();
      if (content) {
        container.append(content);
        content.addEventListener("click", (event) => {
          if (userMessageBlock) {
            while (userMessageBlock.firstChild) {
              userMessageBlock.removeChild(userMessageBlock.firstChild);
            }
          }
          if (noMessageBlock && messageBlock) {
            noMessageBlock.style.display = "none";
            messageBlock.style.display = "flex"; 
            if (event.target) {
              const userNameElement = (event.target as HTMLElement).querySelector('.user__name');
              let userName = 'user'
              if (userNameElement) { 
                userName = userNameElement.textContent || 'user';
              }   
              const chat = new UserChat({ name: userName as string, message: "online" });
              const messageList = new MessageList();
              if (chat && messageList) {
                const chatContent = chat.getContent();
                if (chatContent && userMessageBlock) userMessageBlock.append(chatContent);

                const messageListContent = messageList.getContent();
                if (messageListContent && userMessageBlock) userMessageBlock.append(messageListContent);
              }
            }
          }
        });
      }
    }
  }
});
observer.observe(document.body, { childList: true, subtree: true });
