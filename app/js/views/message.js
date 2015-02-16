import { View } from 'components/fxos-mvc/dist/mvc';

var correctTemplate = `
  <h1 class="correct">Well done!</h1>
  <p><input type="button" value="Continue"></p>
  `;

var incorrectTemplate = `
  <h1 class="incorrect">Incorrect :-(</h1>
  <p><input type="button" value="Continue"></p>
  `;

var nextLevelTemplate = `
  <h1 class="next-level">Congratulations!!</h1>
  <p>You've progressed to a new level!</p>
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

    switch (type) {
      case 'correct':
        this.el.innerHTML = correctTemplate;
        return;
      case 'incorrect':
        this.el.innerHTML = incorrectTemplate;
        return;
      case 'next-level':
        this.el.innerHTML = nextLevelTemplate;
        return;
      default:
        throw(new Error('Unknown view requested: ' + type + '.'));
    }
  }

  setActive(active) {
    this.el.classList.toggle('active', active);
  }
}
