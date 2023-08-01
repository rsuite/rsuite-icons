import React from 'react';
import { createIconFont } from '../src';

function clearIconScripts() {
  Array.from(document.querySelectorAll('[data-prop="icon-font"]')).map(el =>
    document.body.removeChild(el)
  );
}

it('Should loaded a script with string scriptUrl', () => {
  const Icon = createIconFont({
    scriptUrl: '//at.alicdn.com/t/font_2120285_e1hn0qlkipm.js'
  });
  cy.mount(<Icon icon="" />);

  cy.get('[src="//at.alicdn.com/t/font_2120285_e1hn0qlkipm.js"]').should('have.length', 1);
  cy.get('svg').should('have.class', 'rs-icon-font');
  cy.get('svg').should('have.html', '');
});

it('Should loaded a script with string array scriptUrl', () => {
  createIconFont({
    scriptUrl: ['//at.alicdn.com/t/font_2120285_e1hn0qlkipm.js']
  });

  cy.get('[src="//at.alicdn.com/t/font_2120285_e1hn0qlkipm.js"]').should('have.length', 1);
});

it('Should execute loaded', () => {
  const fakeFn = cy.spy();
  createIconFont({
    scriptUrl: '//at.alicdn.com/t/font_2120285_e1hn0qlkipm.js',
    onLoaded: fakeFn
  });

  expect(fakeFn).to.be.calledOnce;
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
  // When execute this case must remove all Icon script.
  clearIconScripts();
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

it('Should render props to icon component', () => {
  const Icon = createIconFont({
    scriptUrl: '//at.alicdn.com/t/font_2120285_e1hn0qlkipm.js',
    commonProps: { className: 'test-props-by-create' }
  });

  cy.mount(<Icon icon="" />);
  cy.get('svg').should('have.class', 'test-props-by-create');
});

it('Should render use element', () => {
  const Icon = createIconFont({
    scriptUrl: '//at.alicdn.com/t/font_2120285_e1hn0qlkipm.js'
  });

  cy.mount(<Icon icon="rs-upload" />);
  cy.get('use').should('have.attr', 'xlink:href', '#rs-upload');
});
