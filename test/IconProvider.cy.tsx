import React from 'react';
import { Icon, IconProvider } from '../src';

it('Should custom classPrefix and have csp', () => {
  cy.mount(
    <IconProvider
      value={{
        classPrefix: 'my-',
        csp: {
          nonce: '123456'
        }
      }}
    >
      <Icon />
    </IconProvider>
  );

  cy.get('svg').should('have.class', 'my-icon');
  cy.get('style').should('have.attr', 'nonce', '123456');
});
