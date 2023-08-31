/* eslint-disable import/extensions */
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import MyProfile from './MyProfile';
import store from '../redux/store';

describe('Component render testing', () => {
  it('MyProfile page renders correctly', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MyProfile />
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
