import wallet from '../../app/reducers/wallet';
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../../app/actions/wallet';

describe('reducers', () => {
  describe('wallet', () => {
    it('should handle initial state', () => {
      expect(wallet(undefined, {})).toMatchSnapshot();
    });

    it('should handle INCREMENT_COUNTER', () => {
      expect(wallet(1, { type: INCREMENT_COUNTER })).toMatchSnapshot();
    });

    it('should handle DECREMENT_COUNTER', () => {
      expect(wallet(1, { type: DECREMENT_COUNTER })).toMatchSnapshot();
    });

    it('should handle unknown action type', () => {
      expect(wallet(1, { type: 'unknown' })).toMatchSnapshot();
    });
  });
});
