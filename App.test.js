import React from 'react';
import renderer from 'react-test-renderer';

import App from './App';

describe('<App />', () => {
  it('has 2 children', () => {
    jest.useFakeTimers("modern")
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(2);
  });
});
