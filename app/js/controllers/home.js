import { Controller } from 'components/fxos-mvc/dist/mvc';

import HomeView from 'js/views/home';

import /*global shuffle*/ 'components/shuffle-array/index';

export default
class HomeController extends Controller {
  constructor(options) {
    console.log('HomeController#constructor()');

    this.view = new HomeView({
      el: document.getElementById('home')
    });
    super(options);
  }

  main() {
    console.log('HomeController#main()');

    this.view.setActive(true);

    // Start a quiz.
    this.quiz(3);
  }

  teardown() {
    console.log('HomeController#teardown()');

    this.view.setActive(false);
  }

  quiz(level) {
    var word = this.pickAWord(level);
    var suggestions = [
      word[1],
      this.pickAWord(level)[1],
      this.pickAWord(level)[1]
    ];

    shuffle(suggestions);

    this.view.renderQuiz(word, suggestions);
  }

  pickAWord(level) {
    var pickedLevel = Math.floor(Math.random() * level);

    return shuffle.pick(this.words[pickedLevel]);
  }
}
