import { ClientFunction, Selector } from 'testcafe';
import { ReactSelector, waitForReact } from 'testcafe-react-selectors';
import { getPageUrl } from './helpers';

const getPageTitle = ClientFunction(() => document.title);
const walletSelector = Selector('[data-tid="wallet"]');
// const buttonsSelector = Selector('[data-tclass="btn"]');
const clickToWalletLink = t =>
  t.click(Selector('a').withExactText('to Wallet'));
const getWalletText = () => walletSelector().innerText;
const assertNoConsoleErrors = async t => {
  const { error } = await t.getBrowserConsoleMessages();
  await t.expect(error).eql([]);
};

fixture`Home Page`.page('../../app/app.html').afterEach(assertNoConsoleErrors);

test('e2e', async t => {
  await t.expect(getPageTitle()).eql('EthWallet');
});

test('should open window', async t => {
  await t.expect(getPageTitle()).eql('EthWallet');
});

test(
  "should haven't any logs in console of main window",
  assertNoConsoleErrors
);

test('should to Wallet with click "to Wallet" link', async t => {
  await t
    .click('[data-tid=container] > a')
    .expect(getWalletText())
    .eql('0');
});

test('should navgiate to /wallet', async t => {
  await waitForReact();
  await t
    .click(
      ReactSelector('Link').withProps({
        to: '/wallet'
      })
    )
    .expect(getPageUrl())
    .contains('/wallet');
});

fixture`Wallet Tests`
  .page('../../app/app.html')
  .beforeEach(clickToWalletLink)
  .afterEach(assertNoConsoleErrors);

test('should back to home if back button clicked', async t => {
  await t
    .click('[data-tid="backButton"] > a')
    .expect(Selector('[data-tid="container"]').visible)
    .ok();
});
