import {expect} from 'chai';
import {Base64Url} from '../../src/encoder/Base64Url';

export function run(): void {

  describe('Base64Url', (): void => {

    const createRandomBinaryString = (length: number): string => {

      let str = '';

      for (let i = 0; i< length; i++) {

        str += Math.round(Math.random());

      }
      return str;

    };
    const shouldBeGood = (input: string): void => {

      it(`should encode and decode ${input.length} bit long input`, (): void => {

        const base64Url: Base64Url = new Base64Url();
        const encoded = base64Url.encode(input);
        const decoded = base64Url.decode(encoded);

        /**
         * there might be some additional zeros added to the end if the string is
         * an arbitrary length and doesn't fit evenly into 6 bits
         *
         * put as many '0's in the front as the remainder of the length divided
         * by 6 bits
         */
        let expected = input;

        if (expected.length % 6 !== 0) {

          expected += '0'.repeat(6-(expected.length % 6));

        }

        expect(decoded).to.equal(expected);

      });

    };

    shouldBeGood(createRandomBinaryString(Math.pow(2, 1)));

    // length: 8
    shouldBeGood(createRandomBinaryString(Math.pow(2, 3)));

    // length: 16
    shouldBeGood(createRandomBinaryString(Math.pow(2, 4)));

    // length: 64
    shouldBeGood(createRandomBinaryString(Math.pow(2, 6)));

    // length: 256
    shouldBeGood(createRandomBinaryString(Math.pow(2, 8)));

    // length: 1024
    shouldBeGood(createRandomBinaryString(Math.pow(2, 10)));

    it('should throw an error if something other than a binary string is passed to encode', (): void => {

      const base64Url: Base64Url = new Base64Url();
      const notABinaryString = '0ujalncl;lqo8ur88r2';

      let encoded = '';

      expect((): void => {

        encoded = base64Url.encode(notABinaryString);

      }).to.throw();

      expect(encoded).to.equal('');

    });

    it('should throw an error if something other than a base64url string is passed to decode', (): void => {

      const base64Url: Base64Url = new Base64Url();
      const notABase64UrlString = '0ujalncl;lqo8ur88r2';

      let decoded = '';

      expect((): void => {

        decoded = base64Url.decode(notABase64UrlString);

      }).to.throw();

      expect(decoded).to.equal('');

    });

  });

}
