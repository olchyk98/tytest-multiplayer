import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

describe('Test application', () => {
	it('Check if the socket variable is null by default', () => {
		const element = shallow(
			<App />
		);

		expect( element.instance().socket ).toBeNull();
	});
});