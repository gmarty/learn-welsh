import MultipleChoiceControllerEn from 'js/controllers/multiple_choice_en';

export default
class MultipleChoiceControllerCy extends MultipleChoiceControllerEn {
  constructor(options) {
    console.log('MultipleChoiceControllerCy#constructor()');

    options.showAudioIcon = false;
    options.id = 'multiple-choice-cy';
    options.questionIndex = 1;
    options.choicesIndex = 0;
    super(options);
  }
}
