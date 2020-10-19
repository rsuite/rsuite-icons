import React from 'react';

import { getDOMNode } from './TestWrapper';
import { Icon } from '../src';

describe('Icon', () => {
  it('Should with component base class name', () => {
    const instanceDom = getDOMNode(<Icon />);
    assert.include(instanceDom.className, 'rs-icon');
  });

  it('Should not change component base class name', () => {
    const instanceDom = getDOMNode(<Icon baseClassName="test-icon" />);
    assert.notInclude(instanceDom.className, 'test-icon');
  });
});
