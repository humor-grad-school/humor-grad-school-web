import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export type DropDownMenuItemProps = {
  name: string;
  linkTo: string;
}

const StyledNavLink = styled(NavLink)`
  display: none;
  height: 1.5em;
  text-decoration: none;
  color: #000;
  background-color: #CCC;
  padding: 2px 4px;
  margin-top: 4px;
  line-height: 1.5em;
  white-space: nowrap;
  transition: color 0.25s;
  transition: background-color 0.25s;

  :hover {
    color: #888;
    background-color: #DDD;
  }
`;

export default function DropDownMenuItem({
  name,
  linkTo,
}: DropDownMenuItemProps): JSX.Element {
  return (
    <StyledNavLink
      to={linkTo}
    >
      {name}
    </StyledNavLink>
  );
}
