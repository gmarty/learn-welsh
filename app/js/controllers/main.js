import { Controller } from 'components/fxos-mvc/dist/mvc';

import { Service } from 'components/fxos-mvc/dist/mvc';

import MultipleChoiceController from 'js/controllers/multiple_choice';
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
      multiple_choice: new MultipleChoiceController(options),
      message: new MessageController(options)
    };

    this.service.addEventListener('answerdismissed', () => {
      this.doExercise();
    });

    // Observe the score and update the view accordingly.
    this.score.on('correct', () => {
      this.controllers.message.view.render('correct');
      this.setActiveController('message');
    });
    this.score.on('incorrect', () => {
      this.controllers.message.view.render('incorrect');
      this.setActiveController('message');
    });
  }

  main() {
    console.log('MainController#main()');

    var getWords = this.jsonXhrFactory('assets/data/words.json');

    getWords
      .then(words => {
        this.controllers.multiple_choice.words = words;

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
    this.setActiveController('multiple_choice');
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
