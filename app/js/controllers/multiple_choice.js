import { Controller } from 'components/fxos-mvc/dist/mvc';

import MultipleChoiceView from 'js/views/multiple_choice';

import /*global shuffle*/ 'components/shuffle-array/index';

export default
class MultipleChoiceController extends Controller {
  constructor(options) {
    console.log('MultipleChoiceController#constructor()');

    this.view = new MultipleChoiceView({
      el: document.getElementById('multiple-choice')
    });
    this.word = null;
    super(options);
  }

  main() {
    console.log('MultipleChoiceController#main()');

    if (!this.words) {
      throw(new Error('The list of words is required.'));
    }

    this.view.setActive(true);

    // Start a quiz.
    this.exercise(this.score.level);
  }

  teardown() {
    console.log('MultipleChoiceController#teardown()');

    this.view.setActive(false);
  }

  exercise(level = 0) {
    this.word = this.pickAWord(level);

    var suggestions = [
      this.word[1],
      this.pickAWord(level)[1],
      this.pickAWord(level)[1]
    ];

    shuffle(suggestions);

    this.view.renderQuiz(this.word, suggestions);
  }

  answer(choice) {
    if (choice === this.word[1]) {
      this.score.incrementScore('correct');
      return;
    }

    this.score.incrementScore('incorrect');
  }

  pickAWord(level) {
    var pickedLevel = Math.floor(Math.random() * level);

    return shuffle.pick(this.words[pickedLevel]);
  }
}
