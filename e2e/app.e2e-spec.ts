import { GMITaskPage } from './app.po';

describe('gmi-task App', () => {
  let page: GMITaskPage;

  beforeEach(() => {
    page = new GMITaskPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
