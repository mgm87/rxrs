import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';

import { RxRs } from '../src/rxrs';

/**
 * RxRs
 */
describe('RxRs', () => {
  it('RxRs is instantiable', () => {
    expect(new RxRs()).toBeInstanceOf(RxRs);
  });

  describe('observe', () => {
    it('should return an observable for the given query string', () => {
      // Arrange
      global.window.matchMedia = () => {
        return {
          matches: false,
          addListener: () => {
            return {};
          }
        };
      };
      const rxrs = new RxRs();
      const queryString = '(max-width: 480px)';
      const expected = cold('a', { a: false });

      // Act
      const actual = rxrs.observe(queryString);

      // Assert
      expect(actual).toBeObservable(expected);
    });

    it('should return the same observable for the given query string', () => {
      // Arrange
      let firstCall = true;
      global.window.matchMedia = () => {
        return {
          matches: () => {
            if (firstCall) {
              firstCall = false;
              return true;
            } else {
              return false;
            }
          },
          addListener: () => {
            return {};
          }
        };
      };
      const rxrs = new RxRs();
      const queryString = '(max-width: 480px)';

      // Act
      const expected = rxrs.observe(queryString);
      const actual = rxrs.observe(queryString);

      // Assert
      expect(actual).toEqual(expected);
    });

    it('should return a new observable for a new query string', () => {
      // Arrange
      let firstCall = true;
      global.window.matchMedia = () => {
        return {
          matches: () => {
            if (firstCall) {
              firstCall = false;
              return true;
            } else {
              return false;
            }
          },
          addListener: () => {
            return {};
          }
        };
      };
      const rxrs = new RxRs();
      const queryString1 = '(max-width: 480px)';
      const queryString2 = '(max-width: 360px)';

      // Act
      const expected = rxrs.observe(queryString1);
      const actual = rxrs.observe(queryString2);

      // Assert
      expect(actual).not.toEqual(expected);
    });
  });

  describe('testQuery', () => {
    it('should get next observable value when callback is called', () => {
      // Arrange
      let callbackFn: Function;
      global.window.matchMedia = () => {
        return {
          matches: () => false,
          addListener: (callback: Function) => {
            callbackFn = callback;
            return;
          }
        };
      };
      const rxrs = new RxRs();
      const queryString = '(max-width: 480px)';
      const actual = rxrs.observe(queryString);
      const expected = cold('a', { a: true });

      // Act
      callbackFn({
        media: queryString,
        matches: true
      });

      // Assert
      expect(actual).toBeObservable(expected);
    });
  });
});
