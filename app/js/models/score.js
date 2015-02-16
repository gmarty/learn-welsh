import { Model } from 'components/fxos-mvc/dist/mvc';

export default
class Score extends Model {
  constructor() {
    var properties = {
      level: parseInt(localStorage.getItem('level')) || 0,
      maxLevel: 0,
      correct: parseInt(localStorage.getItem('correct')) || 0,
      incorrect: parseInt(localStorage.getItem('incorrect')) || 0
    };
    super(properties);

    this.on('level', () => {
      var level = this.level;
      level = Math.max(0, level);
      level = Math.min(level, this.maxLevel);

      localStorage.setItem('level', level);
    });
  }

  incrementScore(type = 'correct') {
    if (type !== 'correct' && type !== 'incorrect') {
      return;
    }

    this[type]++;
    localStorage.setItem(type, this[type]);
  }

  get totalAnswers() {
    return this.correct + this.incorrect;
  }

  get percentage() {
    return Math.round(this.correct / this.totalAnswers * 100);
  }

  get answersBeforeNextLevel() {
    return (this.level + 1) * 20;
  }
}
