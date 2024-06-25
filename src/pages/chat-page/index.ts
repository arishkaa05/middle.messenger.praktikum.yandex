import "./chat-page.scss";
export { default as ChatPage } from "./chat-page.hbs?raw";
import PageWithList from "../../modules/classes/PageWithList";

const observer = new MutationObserver(() => {
  const container = document.querySelector(".chat-page__list");
  if (container) {
    observer.disconnect();
    const block = new PageWithList({buttonText: ''});
    if (block) {
      const content = block.getContent();
      if (content) {
        container.append(content);
      }
    }
  }
});
observer.observe(document.body, { childList: true, subtree: true });
