import { View } from 'components/fxos-mvc/dist/mvc';

var correctTemplate = `
  <h1 class="correct">Well done!</h1>
  <p><input type="button" value="Continue"></p>
  `;

var incorrectTemplate = `
  <h1 class="incorrect">Incorrect :-(</h1>
  <p><input type="button" value="Continue"></p>
  `;

export default
class MessageView extends View {
  constructor(options) {
    console.log('MessageView#constructor()');

    super(options);
  }

  init(controller) {
    console.log('MessageView#init()');

    super(controller);

    this.on('click', 'input[type="button"]', () => {
      this.service._dispatchEvent('answerdismissed');
    });
  }

  render(type = 'correct') {
    console.log('MessageView#render()');

    if (type === 'correct') {
      this.el.innerHTML = correctTemplate;
      return;
    }

    this.el.innerHTML = incorrectTemplate;
  }

  setActive(active) {
    this.el.classList.toggle('active', active);
  }
}
