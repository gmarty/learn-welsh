import { View } from 'components/fxos-mvc/dist/mvc';

var template = `
  <h1><input type="button" value="♫" class="play" disabled hidden/><span class="question"></span></h1>
  <ul class="choices"></ul>
  `;

var renderChoice = word => `
  <li><button>${word}</button></li>
  `;

export default
class MultipleChoiceView extends View {
  constructor(options) {
    console.log('MultipleChoiceView#constructor()');

    super(options);
  }

  init(controller) {
    super(controller);
    this.render();

    this.play = this.$('.play');
    this.question = this.$('.question');
    this.choices = this.$('.choices');
    this.mp3 = null;

    if (this.controller.showAudioIcon) {
      this.on('click', 'input.play', () => {
        if (this.mp3) {
          this.mp3.play();
        }
      });
      this.play.removeAttribute('hidden');
    }

    this.on('click', 'ul.choices li button',
        evt => {
        this.choices.classList.remove('clickable');
        this.play.setAttribute('disabled', true);
        this.mp3 = null;

        var choice = evt.target.textContent;
        this.controller.answer(choice);
      });
  }

  template() {
    return template;
  }

  setActive(active) {
    this.el.classList.toggle('active', active);
  }

  renderQuiz(word, suggestions) {
    this.question.textContent = word[this.controller.questionIndex];
    this.choices.innerHTML = suggestions
      .map(choice => renderChoice(choice))
      .join('');

    if (this.controller.showAudioIcon) {
      this.mp3 = new Audio();
      this.mp3.src = `assets/mp3/${word[2]}`;
      // @todo Listen to the loaded event before enabling the playback button.
      this.play.removeAttribute('disabled');
    }

    this.choices.classList.add('clickable');
  }
}
