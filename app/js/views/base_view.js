import { View } from 'components/fxos-mvc/dist/mvc';

export default class BaseView extends View {
  layout(template) {
    return `
      <header>
        <h1>Learn Welsh</h1>
      </header>
      ${template}
      `;
  }
}
