import { View } from 'components/fxos-mvc/dist/mvc';

var correctTemplate = message => `
  <h2 class="correct">Well done!</h2>
  <h1><input type="button" value="♫" class="play"/><span class="question">${message.word[0]}</span></h1>
  <p class="translation">${message.word[1]}</p>
  <p><input type="button" value="Continue" class="next"></p>
  `;

var incorrectTemplate = message => `
  <h2 class="incorrect">Incorrect :-(</h2>
  <h1><input type="button" value="♫" class="play"/><span class="question">${message.word[0]}</span></h1>
  <p class="translation">${message.word[1]}</p>
  <p><input type="button" value="Continue" class="next"></p>
  `;

var nextLevelTemplate = `
  <h1 class="next-level">Congratulations!!</h1>
  <p>You've progressed to a new level!</p>
  <p><input type="button" value="Continue" class="next"></p>
  `;

export default class MessageView extends View {
  constructor(options) {
    console.log('MessageView#constructor()');

    super(options);
  }

  init(controller) {
    console.log('MessageView#init()');

    super(controller);

    this.mp3 = null;

    this.on('click', 'input.next', () => {
      this.service._dispatchEvent('answerdismissed');
    });

    this.on('click', 'input.play', () => {
      if (this.mp3) {
        this.mp3.play();
      }
    });
  }

  render(type = 'correct', message = { word: [] }) {
    console.log('MessageView#render()');

    switch (type) {
      case 'correct':
        this.el.innerHTML = correctTemplate(message);
        this.mp3 = new Audio();
        this.mp3.src = `/assets/mp3/${message.word[2]}`;
        break;
      case 'incorrect':
        this.el.innerHTML = incorrectTemplate(message);
        this.mp3 = new Audio();
        this.mp3.src = `/assets/mp3/${message.word[2]}`;
        break;
      case 'next-level':
        this.el.innerHTML = nextLevelTemplate;
        this.mp3 = null;
        break;
      default:
        throw(new Error(`Unknown view requested: ${type}.`));
    }
  }

  setActive(active) {
    this.el.classList.toggle('active', active);
  }
}
