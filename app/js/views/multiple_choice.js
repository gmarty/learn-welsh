import { View } from 'components/fxos-mvc/dist/mvc';

var template = `
  <h1><input type="button" value="♫" class="play" disabled hidden/><span class="question"></span></h1>
  <ul class="choices clickable"></ul>
  `;

var renderChoice = word => `
  <li>${word}</li>
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
      this.on('click', '#' + this.controller.id + ' input.play', () => {
        if (this.mp3) {
          this.mp3.play();
        }
      });
      this.play.removeAttribute('hidden');
    }

    this.on('click', '#' + this.controller.id + ' ul.choices li', evt => {
      //this.choices.classList.remove('clickable');
      //this.play.setAttribute('disabled', true);
      this.mp3 = null;

      var choice = evt.target.innerHTML;
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
    var question = word[this.controller.questionIndex];
    var finalPunctuation = this.getFinalPunctuation(question);

    this.question.textContent = question;
    this.choices.innerHTML = suggestions
      .map(choice => this.replaceFinalPunctuation(choice, finalPunctuation))
      .map(choice => renderChoice(choice))
      .join('');

    if (this.controller.showAudioIcon) {
      this.mp3 = new Audio();
      this.mp3.src = `assets/mp3/${word[2]}`;
      // @todo Listen to the loaded event before enabling the playback button.
      this.play.removeAttribute('disabled');
    }
  }

  /**
   * To avoid users cheating using the punctuation to infer the right answer,
   * we change the final punctuation in the choices to match that of the word.
   *
   * @param {string} word
   * @returns {string}
   */
  getFinalPunctuation(word) {
    var matches = word.match(/[\.?!]+$/);
    return matches ? matches[0] : '';
  }

  /**
   * @param {string} word
   * @param {string} finalPunctuation
   * @returns {string}
   */
  replaceFinalPunctuation(word, finalPunctuation) {
    return word.replace(/[\.?!]+$/, '') + finalPunctuation;
  }
}
