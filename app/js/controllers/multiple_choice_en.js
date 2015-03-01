import { Controller } from 'components/fxos-mvc/dist/mvc';

import MultipleChoiceView from 'js/views/multiple_choice';

import /*global shuffle*/ 'components/shuffle-array/index';

export default
class MultipleChoiceControllerEn extends Controller {
  constructor(options) {
    console.log('MultipleChoiceControllerEn#constructor()');

    options = Object.create(options);
    var defaultOptions = {
      id: 'multiple-choice-en',
      showAudioIcon: true,
      questionIndex: 0,
      choicesIndex: 1,
      words: [],
      word: null
    };

    for (var option in defaultOptions) {
      if (options[option] === undefined) {
        options[option] = defaultOptions[option];
      }
    }

    this.view = new MultipleChoiceView({
      el: document.getElementById(options.id)
    });
    super(options);
  }

  main() {
    if (!this.words) {
      throw(new Error('The list of words is required.'));
    }

    this.view.setActive(true);

    // Start a quiz.
    this.exercise(this.score.level);
  }

  teardown() {
    this.view.setActive(false);
  }

  exercise(level = 0) {
    this.word = this.pickAWord(level);

    var suggestions = [
      this.word[this.choicesIndex],
      this.pickAWord(level)[this.choicesIndex],
      this.pickAWord(level)[this.choicesIndex]
    ];

    shuffle(suggestions);

    this.view.renderQuiz(this.word, suggestions);
  }

  answer(choice) {
    var message = {
      word: this.word
    };

    if (choice === this.word[this.choicesIndex]) {
      this.score.incrementScore('correct');
      this.service._dispatchEvent('correct', {
        message: message
      });
      return;
    }

    this.score.incrementScore('incorrect');
    this.service._dispatchEvent('incorrect', {
      message: message
    });
  }

  pickAWord(level) {
    var pickedLevel = Math.floor(Math.random() * level);

    return shuffle.pick(this.words[pickedLevel]);
  }
}
