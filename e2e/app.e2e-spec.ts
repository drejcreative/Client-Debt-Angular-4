import { ClientPanelPage } from './app.po';

describe('client-panel App', () => {
  let page: ClientPanelPage;

  beforeEach(() => {
    page = new ClientPanelPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
