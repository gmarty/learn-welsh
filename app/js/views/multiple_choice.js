import { View } from 'components/fxos-mvc/dist/mvc';

var template = `
  <div class="main">
    <p class="question"></p>
    <ul class="choices"></ul>
  </div>
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

    this.main = this.$('.main');
    this.question = this.$('.question');
    this.choices = this.$('.choices');
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

    var clickHandler = (evt) => {
      this.off('click', '#multiple-choice .choices li', clickHandler);

      var response = evt.target.innerHTML;
      if (response === word[1]) {
        this.controller.score.incrementScore('correct');
        return;
      }

      this.controller.score.incrementScore('incorrect');
    };

    this.on('click', '#multiple-choice .choices li', clickHandler);
  }

  renderChoice(word) {
    return `<li>${word}</li>`;
  }
}
