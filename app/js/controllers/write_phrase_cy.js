/* global shuffle */

import { Controller } from 'components/fxos-mvc/dist/mvc';

import WritePhraseView from 'js/views/write_phrase';

export default class WritePhraseControllerCy extends Controller {
  constructor(options) {
    console.log('WritePhraseControllerCy#constructor()');

    options = Object.create(options);
    var defaultOptions = {
      id: 'write-phrase-cy',
      words: [],
      word: null,
      sound: document.createElement('audio')
    };

    for (var option in defaultOptions) {
      if (options[option] === undefined) {
        options[option] = defaultOptions[option];
      }
    }

    options.view = new WritePhraseView({
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
    this.view.renderQuiz(this.word);
  }

  answer(choice) {
    var message = {
      word: this.word
    };

    if (this.compare(choice, this.word[0])) {
      this.score.incrementScore('correct');
      this.service._dispatchEvent('correct', {
        question: this.word,
        answer: choice,
        message: message
      });
      return;
    }

    this.score.incrementScore('incorrect');
    this.service._dispatchEvent('incorrect', {
      question: this.word,
      answer: choice,
      message: message
    });
  }

  compare(strA, strB) {
    function process(str) {
      return str
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/[-,\.?!]+/g, '')
        .replace(/[âäáà]/g, 'a')
        .replace(/[êëéè]/g, 'e')
        .replace(/[îïíì]/g, 'i')
        .replace(/[ôöóò]/g, 'o')
        .replace(/[ûüúù]/g, 'u')
        .replace(/[ŵẅẃẁ]/g, 'w')
        .replace(/[ŷÿýỳ]/g, 'w')
        .trim();
    }

    console.log(strA, strB);

    strA = process(strA);
    strB = process(strB);

    console.log(strA, strB);

    // @todo Use Levenshtein distance here.
    return strA === strB;
  }

  pickAWord(level) {
    var pickedLevel = Math.floor(Math.random() * level);

    return shuffle.pick(this.words[pickedLevel]);
  }
}
