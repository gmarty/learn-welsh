import View from './base_view';

var template = `
  <h2><input type="button" value="♫" class="play" disabled/></h2>
  <p><textarea placeholder="Listen and type in Welsh" class="phrase" rows="2"></textarea></p>
  <p><input type="button" value="OK" class="validate"/></p>
  `;

export default class WritePhraseView extends View {
  constructor(options) {
    console.log('WritePhraseView#constructor()');

    super(options);
  }

  init(controller) {
    super(controller);

    this.render();

    this.play = this.$('.play');
    this.phrase = this.$('.phrase');
    this.mp3 = null;

    this.on('click', 'input.play', () => {
      if (this.mp3) {
        this.mp3.play();
      }
    });

    this.on('click', 'input.validate', () => {
      this.play.setAttribute('disabled', true);
      this.mp3 = null;

      var answer = this.phrase.value;
      this.controller.answer(answer);
    });
  }

  template() {
    return template;
  }

  setActive(active) {
    this.el.classList.toggle('active', active);
  }

  renderQuiz(word) {
    this.mp3 = new Audio();
    this.mp3.src = `/assets/mp3/${word[2]}`;
    // @todo Listen to the loaded event before enabling the playback button.
    this.play.removeAttribute('disabled');
    this.phrase.value = '';
  }
}
