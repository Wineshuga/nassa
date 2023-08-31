import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import RocketList from '../Rockets';
// eslint-disable-next-line import/extensions
import { getAPI, reservation } from '../redux/rocketsSlice';

// Mock the Redux store
const mockStore = configureStore([]);
const store = mockStore({
  rockets: {
    RocketList: [
      {
        id: 'rocket1',
        name: 'Rocket One',
        disc: 'Test description',
        images: 'test-image.jpg',
        reserved: false,
      },
      {
        id: 'rocket2',
        name: 'Rocket Two',
        disc: 'Another test description',
        images: 'test-image2.jpg',
        reserved: true,
      },
    ],
    isLoading: false,
    error: null,
  },
});

describe('RocketList component', () => {
  beforeEach(() => {
    store.clearActions();
  });

  test('renders the loading state when isLoading is true', () => {
    render(
      <Provider store={store}>
        <RocketList />
      </Provider>,
    );

    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  test('renders the RocketList when isLoading is false', () => {
    render(
      <Provider store={store}>
        <RocketList />
      </Provider>,
    );

    expect(screen.getByTestId('RocketList')).toBeInTheDocument();

    // Check if Rocket components are rendered correctly
    expect(screen.getByText('Rocket One')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('Rocket Two')).toBeInTheDocument();
    expect(screen.getByText('Another test description')).toBeInTheDocument();

    // Check if the reservation button is rendered and functions correctly
    const reserveButton = screen.getByText('Reserve rocket');
    expect(reserveButton).toBeInTheDocument();

    fireEvent.click(reserveButton);
    expect(store.getActions()).toEqual([reservation('rocket2')]);
  });

  test('renders the error message when there is an error', () => {
    const errorMessage = 'Error occurred while fetching rockets';
    store.getState().rockets.error = errorMessage;

    render(
      <Provider store={store}>
        <RocketList />
      </Provider>,
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('dispatches getAPI action when RocketList is empty', () => {
    store.getState().rockets.RocketList = [];

    render(
      <Provider store={store}>
        <RocketList />
      </Provider>,
    );

    expect(store.getActions()).toEqual([getAPI()]);
  });
});
