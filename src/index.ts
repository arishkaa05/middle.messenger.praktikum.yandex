import Handlebars from "handlebars";
import * as Components from "./components/index";
import * as Blocks from "./blocks/index";
import formValidation from "./modules/validation";
import navigate from "./modules/navigate";

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

Object.entries(Blocks).forEach(([name, block]) => {
  Handlebars.registerPartial(name, block);
});

document.addEventListener("DOMContentLoaded", () => {
  const url = new URL(window.location.href);
  const path = url.pathname.slice(1) || "login";
  navigate(path);
  const form = document.querySelector("form");
  if (form) formValidation(form);
});

document.addEventListener("click", (e) => {
  const page = (e.target as HTMLElement).getAttribute("page");
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
