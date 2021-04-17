jest.useFakeTimers();
import 'react-native';
import React from 'react';
import Drinks from '../components/drinks';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('Drinks screen rendering properly!', (done) => {
  const tree = renderer.create(<Drinks />).toJSON();
  expect(tree).toMatchSnapshot();
  done();
});
