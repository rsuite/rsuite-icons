import React from 'react';
import sinon from 'sinon/pkg/sinon';

import { getDOMNode } from './TestWrapper';
import { createIconFont } from '../src';

describe('IconFont', () => {
  it('Should loaded a script with string scriptUrl', () => {
    const Icon = createIconFont({
      scriptUrl: '//at.alicdn.com/t/font_2120285_e1hn0qlkipm.js'
    });
    const instanceDom = getDOMNode(<Icon />);
    assert.equal(
      Array.from(document.querySelectorAll('[src="//at.alicdn.com/t/font_2120285_e1hn0qlkipm.js"]'))
        .length,
      1
    );
    assert.isEmpty(instanceDom.innerHTML, '');
  });

  it('Should loaded a script with string array scriptUrl', () => {
    createIconFont({
      scriptUrl: ['//at.alicdn.com/t/font_2120285_e1hn0qlkipm.js']
    });
    assert.equal(
      Array.from(document.querySelectorAll('[src="//at.alicdn.com/t/font_2120285_e1hn0qlkipm.js"]'))
        .length,
      1
    );
  });

  it('Should execute loaded', done => {
    const fakeFn = sinon.fake();
    createIconFont({
      scriptUrl: '//at.alicdn.com/t/font_2120285_e1hn0qlkipm.js',
      onLoaded: () => {
        fakeFn();
        assert.equal(fakeFn.callCount, 1);
        done();
      }
    });
  });

  it('Should loaded script once', done => {
    createIconFont({
      scriptUrl: [
        '//at.alicdn.com/t/font_2120285_e1hn0qlkipm.js',
        '//at.alicdn.com/t/font_2120285_e1hn0qlkipm.js'
      ],
      onLoaded() {
        assert.equal(
          Array.from(
            document.querySelectorAll('[src="//at.alicdn.com/t/font_2120285_e1hn0qlkipm.js"]')
          ).length,
          1
        );
        done();
      }
    });
  });

  it('Should loaded all script', done => {
    createIconFont({
      scriptUrl: [
        '//at.alicdn.com/t/font_2136376_1mb0zgmsqss.js',
        '//at.alicdn.com/t/font_2136337_grausewstuw.js'
      ],
      onLoaded() {
        assert.equal(Array.from(document.querySelectorAll('[data-prop="icon-font"]')).length, 2);
        done();
      }
    });
  });

  it(
    'Should render use element',
    () => {
      const Icon = createIconFont({
        scriptUrl: '//at.alicdn.com/t/font_2120285_e1hn0qlkipm.js'
      });
      const instanceDom = getDOMNode(<Icon icon="rs-upload" />);
      const useEl = instanceDom.firstChild.firstChild;
      assert.equal(useEl.tagName, 'use');
      assert.equal(useEl.getAttribute('xlink:href'), '#rs-upload');
    },
    []
  );
});
