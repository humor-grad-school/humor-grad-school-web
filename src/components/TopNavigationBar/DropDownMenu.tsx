import React from 'react';
import styled from 'styled-components';
import DropDownMenuItem, { DropDownMenuItemProps } from './DropDownMenuItem';

type ContainerProps = {
  itemCount: number;
}

const Container = styled.div`
  position: relative;  
  height: 64px;
  line-height: 64px;
  padding: 0px 16px;
  margin-left: 4px;
  color: #000;
  transition: color 0.5s;
  user-select: none;

  :hover {
    color: #888;

    &>div {
      height: ${(props: ContainerProps) => (props.itemCount * 32)}px;
    }

    &>div>a {
      display: block;
    }
  }
`;

const DropDownContainer = styled.div`
  position: absolute;
  min-width: 160px;
  z-index: 1;
  height: 0px;
  border-left: 4px solid #444;
  overflow: hidden;
  transition: height cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s;
`;

export default function DropDownMenu({
  name,
  items,
}: {
  name: string;
  items: DropDownMenuItemProps[];
}): JSX.Element {
  const DropDownMenuItems = items.map(dropDownMenuItemProps => (
    <DropDownMenuItem name={dropDownMenuItemProps.name} linkTo={dropDownMenuItemProps.linkTo} />
  ));

  return (
    <Container itemCount={items.length}>
      {name}
      <DropDownContainer>
        {DropDownMenuItems}
      </DropDownContainer>
    </Container>
  );
}
