import * as React from 'react';

import {
    Container,
    Row,
    Column,
} from '../../../Common/components/Layout/index';
import { Text } from '../../../Common/components/Text/index';

import { colors } from '../../../../theme/colors';

export default class Body extends React.PureComponent<any, { checked: boolean }> {
    constructor(props: any) {
        super(props);

        this.state = { checked: false };
    }

    handleChange = () => {
        this.setState({ checked: !this.state.checked }, () => {
            chrome.storage.sync.set({ glocMode: !this.state.checked }, function() {
                console.log('Value is set to something');
            });

            chrome.storage.sync.get(['x-github-token', 'glocMode'], result => {
                console.log('chrome.storage.sync.get', result);
            });
        });
    }

	render() {
		return (
            <Container color={colors.grey200}>
                <Row>
                    <Column>
                        <Text>On/Off Gloc</Text>
                    </Column>
                    <Column>
                        <input type={'checkbox'} onChange={this.handleChange} checked={this.state.checked} />
                    </Column>
                </Row>
            </Container>
		);
	}
}
