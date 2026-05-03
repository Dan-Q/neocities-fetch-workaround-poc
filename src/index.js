import { Elena, html } from "@elenajs/core";
import styles from "./style.css" with { type: "css" };

export default class MiniChat extends Elena(HTMLElement) {
  static tagName = 'mini-chat';
  static shadow = 'open';
  static styles = styles;
  static events = [ 'submit' ];

  escape(inString){
    return String(inString).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
  }

  firstUpdated() {
    this.callbackFunctionName = `miniChat_callback_${crypto.randomUUID().replace(/-/g, '')}`;
    window[this.callbackFunctionName] = (data)=>this.handleCallback(data);
    this.element.querySelector('form').addEventListener('submit', this.handleSubmit.bind(this));
    this.pollForUpdate();
  }

  render() {
    return html`
        <section>
        <header>💬 Tiniest Chat</header>
        <ul>
        </ul>
        <form>
          <input type="text" id="name" placeholder="your name" maxlength="10" />
          <input type="text" id="message" placeholder="say something..." maxlength="100" />
          <button type="submit">Send</button>
        </form>
      </section>
    `;
  }

  handleCallback(data) {
    if(data.alert) alert(data.alert);
    if(data.messages) {
      const ul = this.element.querySelector('ul');
      ul.innerHTML = data.messages.map(message => `
        <li>
          <span class="name">${this.escape(message.name)}</span>
          <span class="message">${this.escape(message.message)}</span>
        </li>
      `).join('');
      ul.scrollTop = ul.scrollHeight;
    }
  }

  tidyScripts() {
    for(let oldScript of Array.from(this.element.querySelectorAll('script'))) oldScript.remove();
  }

  callApi(action, params = []){
    this.tidyScripts();
    const script = document.createElement('script');
    let urlParams = new URLSearchParams();
    urlParams.set('callback', this.callbackFunctionName);
    for(let param of params) urlParams.set(param.name, param.value);
    script.src = `https://danq.me/_q23u/neocities-fetch-workaround-poc/${action}.php?${urlParams.toString()}`;
    this.element.appendChild(script);
  }

  pollForUpdate() {
    this.callApi('poll');
    setTimeout(()=>this.pollForUpdate(), 3000);
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const name = this.element.querySelector('#name').value;
    const message = this.element.querySelector('#message').value;
    this.callApi('send', [ { name: 'name', value: name }, { name: 'message', value: message } ]);
    this.element.querySelector('#message').value = '';
    this.element.querySelector('#message').focus();
  }
}
MiniChat.define();
