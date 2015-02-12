import { Controller } from 'components/fxos-mvc/dist/mvc';

import MessageView from 'js/views/message';

export default
class MessageController extends Controller {
  constructor(options) {
    console.log('MessageController#constructor()');

    this.view = new MessageView({
      el: document.getElementById('message'),
      service: options.service
    });
    super(options);
  }

  main() {
    console.log('MessageController#main()');

    this.view.setActive(true);
  }

  teardown() {
    console.log('MessageController#teardown()');

    this.view.setActive(false);
  }
}
