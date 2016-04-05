import MultipleChoiceControllerEn from 'js/controllers/multiple_choice_en';

export default class MultipleChoiceControllerCy extends MultipleChoiceControllerEn {
  constructor(options) {
    console.log('MultipleChoiceControllerCy#constructor()');

    options = Object.create(options);
    options.id = 'multiple-choice-cy';
    options.showAudioIcon = false;
    options.questionIndex = 1;
    options.choicesIndex = 0;
    super(options);
  }
}
