import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  height: 64px;
  line-height: 64px;
  padding: 0px 16px;
  background-color: #CCC;
  text-decoration: none;
  color: #111;
  font-size: 32px;
  font-weight: bold;
`;

export default function HomeButton(): JSX.Element {
  return (
    <StyledLink to="/">
      웃긴 대학원
    </StyledLink>
  );
}
