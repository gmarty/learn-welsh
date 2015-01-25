import { View } from 'components/fxos-mvc/dist/mvc';

var template = `
  <div id="quiz"></div>
  `;

export default
class HomeView extends View {
  constructor(options) {
    console.log('HomeView#constructor()');

    super(options);
  }

  init(controller) {
    console.log('HomeView#init()');

    super(controller);
    this.render();

    this.quiz = this.$('#quiz');
  }

  render() {
    console.log('HomeView#render()');

    super();
  }

  template() {
    return template;
  }

  setActive(active) {
    this.el.classList.toggle('active', active);
  }

  renderQuiz(word, suggestions) {
    this.quiz.innerHTML = '<p>' + word[0] + '</p>' +
    '<ul>' +
    '<li>' + suggestions.join('</li><li>') + '</li>' +
    '</ul>';
  }
}
