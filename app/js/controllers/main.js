import { Controller } from 'components/fxos-mvc/dist/mvc';

import { Service } from 'components/fxos-mvc/dist/mvc';

import MultipleChoiceControllerEn from 'js/controllers/multiple_choice_en';
import MultipleChoiceControllerCy from 'js/controllers/multiple_choice_cy';
import MessageController from 'js/controllers/message';

import Score from 'js/models/score';

function displayError(error) {
  var message = (error.message || error.name || 'Unknown error');
  console.error(message);
}

export default
class MainController extends Controller {
  constructor() {
    console.log('MainController#constructor()');

    this.service = new Service();
    this.score = new Score();

    this.init();
  }

  init() {
    console.log('MainController#init()');

    var options = {
      service: this.service,
      score: this.score
    };

    this.controllers = {
      multiple_choice_en: new MultipleChoiceControllerEn(options),
      multiple_choice_cy: new MultipleChoiceControllerCy(options),
      message: new MessageController(options)
    };

    // Observe the score and update the view accordingly.
    this.service.addEventListener('correct', evt => {
      if (this.score.percentage >= 60 &&
        this.score.totalAnswers >= this.score.answersBeforeNextLevel) {
        // Next level when at least 20 exercises per level were completed with 60% success.
        this.score.level++;
        this.controllers.message.view.render('next-level');
        this.setActiveController('message');
        return;
      }

      this.controllers.message.view.render('correct', evt.message);
      this.setActiveController('message');
    });

    this.service.addEventListener('incorrect', evt => {
      this.controllers.message.view.render('incorrect', evt.message);
      this.setActiveController('message');
    });

    this.service.addEventListener('answerdismissed', () => {
      this.doExercise();
    });
  }

  main() {
    console.log('MainController#main()');

    var getWords = this.jsonXhrFactory('assets/data/words.json');

    getWords
      .then(words => {
        this.score.maxLevel = words.length;
        this.controllers.multiple_choice_en.words = words;
        this.controllers.multiple_choice_cy.words = words;

        this.doExercise();
      })
      .catch(displayError);
  }

  setActiveController(controllerName) {
    if (this.activeController === this.controllers[controllerName]) {
      return;
    }

    if (this.activeController) {
      this.activeController.teardown();
    }

    this.activeController = this.controllers[controllerName];
    this.activeController.main();
  }

  doExercise() {
    var rnd = Math.floor(Math.random() * 2);

    switch (rnd) {
      case 0:
        this.setActiveController('multiple_choice_en');
        break;
      case 1:
        this.setActiveController('multiple_choice_cy');
        break;
      default:
        console.error('Bad choice');
    }
  }

  /**
   * A function that takes a file name as the input and returns a promise that
   * load the file as a JSON using XMLHttpRequest.
   * @param {string} fileName
   */
  jsonXhrFactory(fileName) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', fileName);
      xhr.responseType = 'json';
      xhr.timeout = 3000;
      xhr.overrideMimeType('application/json');
      xhr.setRequestHeader('Accept', 'application/json,text/javascript,*/*;q=0.01');
      xhr.addEventListener('load', function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          resolve(this.response);
        } else {
          reject(new Error('Error downloading "' + fileName + '"'));
        }
      }, false);
      xhr.send();
    });
  }
}
