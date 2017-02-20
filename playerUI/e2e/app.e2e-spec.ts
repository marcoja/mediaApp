import { PlayerUIPage } from './app.po';

describe('player-ui App', () => {
  let page: PlayerUIPage;

  beforeEach(() => {
    page = new PlayerUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
