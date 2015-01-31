import { View } from 'components/fxos-mvc/dist/mvc';

var template = `
  <p><input type="button" value="♫" class="play" disabled/><span class="question"></span></p>
  <ul class="choices clickable"></ul>
  `;

export default
class MultipleChoiceView extends View {
  constructor(options) {
    console.log('MultipleChoiceView#constructor()');

    super(options);
  }

  init(controller) {
    console.log('MultipleChoiceView#init()');

    super(controller);
    this.render();

    this.play = this.$('.play');
    this.question = this.$('.question');
    this.choices = this.$('.choices');
    this.mp3 = null;

    this.on('click', '#multiple-choice .play', () => {
      if (this.mp3) {
        this.mp3.play();
      }
    });
  }

  render() {
    console.log('MultipleChoiceView#render()');

    super();
  }

  template() {
    return template;
  }

  setActive(active) {
    this.el.classList.toggle('active', active);
  }

  renderQuiz(word, suggestions) {
    this.question.textContent = word[0];
    this.choices.innerHTML = suggestions.map(
        choice => this.renderChoice(choice)
    ).join('');

    this.mp3 = new Audio();
    this.mp3.src = `assets/mp3/${word[2]}`;
    // @todo Listen to the loaded event before enabling the playback button.
    this.play.removeAttribute('disabled');

    var clickHandler = (evt) => {
      this.off('click', '#multiple-choice .choices li', clickHandler);
      this.choices.classList.remove('clickable');
      this.play.setAttribute('disabled', true);
      this.mp3 = null;

      var choice = evt.target.innerHTML;
      this.controller.answer(choice);
    };

    this.on('click', '#multiple-choice .choices li', clickHandler);
  }

  renderChoice(word) {
    return `<li>${word}</li>`;
  }
}
