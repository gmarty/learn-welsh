import { Controller } from 'components/fxos-mvc/dist/mvc';

import HomeController from 'js/controllers/home';

function displayError(error) {
  var message = (error.message || error.name || 'Unknown error');
  console.error(message);
}

export default
class MainController extends Controller {
  constructor() {
    console.log('MainController#constructor()');

    this.init();
  }

  init() {
    console.log('MainController#init()');

    this.controllers = {
      home: new HomeController()
    };
  }

  main() {
    console.log('MainController#main()');

    var getWords = this.jsonXhrFactory('assets/data/words.json');

    getWords
      .then(words => {
        this.controllers.home.words = words;

        this.setActiveController('home');
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
