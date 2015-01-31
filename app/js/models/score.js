import { Model } from 'components/fxos-mvc/dist/mvc';

export default
class Score extends Model {
  constructor() {
    var properties = {
      correct: localStorage.getItem('correct') || 0,
      incorrect: localStorage.getItem('incorrect') || 0
    };
    super(properties);
  }

  incrementScore(type = 'correct') {
    if (type !== 'correct' && type !== 'incorrect') {
      return;
    }

    this[type]++;
    localStorage.setItem(type, this[type]);
  }
}
