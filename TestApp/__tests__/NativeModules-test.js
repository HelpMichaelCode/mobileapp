jest.useFakeTimers();
import 'react-native';

// Checks if the react native repo of the project
// is dependent upon this third party library
test('Dependent on react native paper!', (done) =>
{
    jest.mock('react-native-paper', () => 'Card');
    done();
});

test('Dependent on axios!', (done) =>
{
    jest.mock('axios');
    done();
});