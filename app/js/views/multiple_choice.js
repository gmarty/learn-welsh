import { View } from 'components/fxos-mvc/dist/mvc';

var template = `
  <div class="main"></div>
  `;

export default
class MultipleChoiceView extends View {
  constructor(options) {
    console.log('MultipleChoiceView#constructor()');

    super(options);
  }

  init(controller) {
    console.log('MultipleChoiceView#init()');

    super(controller);
    this.render();

    this.main = this.$('.main');
  }

  render() {
    console.log('MultipleChoiceView#render()');

    super();
  }

  template() {
    return template;
  }

  setActive(active) {
    this.el.classList.toggle('active', active);
  }

  renderQuiz(word, suggestions) {
    this.main.innerHTML = '<p>' + word[0] + '</p>' +
    '<ul>' +
    '<li>' + suggestions.join('</li><li>') + '</li>' +
    '</ul>';
  }
}
