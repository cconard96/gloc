/*
    Many thanks to Cole Bemis
    for https://medium.com/@colebemis/building-a-checkbox-component-with-react-and-styled-components-8d3aa1d826dd
*/
import * as React from 'react';
import styled from 'styled-components';

const _CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const _Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;
// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const _HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;


const _StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${(props: any) => (props.checked ? 'salmon' : 'papayawhip')};
  border-radius: 3px;
  transition: all 150ms;

  ${_HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }

  ${_Icon} {
    visibility: ${(props: any) => (props.checked ? 'visible' : 'hidden')};
  }
` as any; // because of property CHECKED


export default function ({ checked, onChange, ...props }:
	{ checked: boolean, onChange: () => void }) {
	return (
		<_CheckboxContainer>
			<_HiddenCheckbox checked={checked} onChange={onChange} {...props} />
			<_StyledCheckbox checked={checked} >
				<_Icon viewBox='0 0 24 24'>
					<polyline points='20 6 9 17 4 12' />
				</_Icon>
			</_StyledCheckbox>
		</_CheckboxContainer>
	);
}
