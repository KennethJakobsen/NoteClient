import { BrainstormerPage } from './app.po';

describe('brainstormer App', () => {
  let page: BrainstormerPage;

  beforeEach(() => {
    page = new BrainstormerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
