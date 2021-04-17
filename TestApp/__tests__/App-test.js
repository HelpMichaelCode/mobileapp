/**
 * @format
 */

jest.useFakeTimers();
import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('Home screen renders correctly!', (done) => {
  // Creates a snapshot of the <App/> component
  // to check if it renders correctly
  renderer.create(<App />);
  done();
});
