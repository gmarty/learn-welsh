import View from './base_view';

var correctTemplate = message => `
  <h3 class="correct">Well done!</h3>
  <h2><input type="button" value="♫" class="play" disabled/><span class="question">${message.word[0]}</span></h2>
  <p class="translation">${message.word[1]}</p>
  <p><input type="button" value="Continue" class="next"></p>
  `;

var incorrectTemplate = message => `
  <h3 class="incorrect">Incorrect :-(</h3>
  <h2><input type="button" value="♫" class="play" disabled/><span class="question">${message.word[0]}</span></h2>
  <p class="translation">${message.word[1]}</p>
  <p><input type="button" value="Continue" class="next"></p>
  `;

var nextLevelTemplate = `
  <h2 class="next-level">Congratulations!!</h2>
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

    this.controller = controller;

    this.play = null;
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
        this.el.innerHTML = this.layout(correctTemplate(message));
        this.mp3 = new Audio();
        this.mp3.src = `/assets/mp3/${message.word[2]}`;
        // @todo Listen to the loaded event before enabling the playback button.
        this.play = this.$('.play');
        this.play.removeAttribute('disabled');
        break;
      case 'incorrect':
        this.el.innerHTML = this.layout(incorrectTemplate(message));
        this.mp3 = new Audio();
        this.mp3.src = `/assets/mp3/${message.word[2]}`;
        // @todo Listen to the loaded event before enabling the playback button.
        this.play = this.$('.play');
        this.play.removeAttribute('disabled');
        break;
      case 'next-level':
        this.el.innerHTML = this.layout(nextLevelTemplate);
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
