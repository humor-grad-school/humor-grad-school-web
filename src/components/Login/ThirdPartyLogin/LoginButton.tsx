import React from 'react';
import styled from 'styled-components';

type ContainerProps = {
  color?: string;
  fontWeight?: string;
  backgroundColor?: string;
}

type LogoContainerProps = {
  backgroundColor?: string;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  width: 214px;
  min-width: 214px;
  height: 40px;
  padding: 0px 8px;
  background-color: ${(props: ContainerProps) => props.backgroundColor || '#777'};
  color: ${(props: ContainerProps) => props.color || '#FFF'};
  font-size: 14px;
  font-weight: ${(props: ContainerProps) => props.fontWeight || '500'};
  font-family: "Roboto";
  line-height: 40px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24px;
  width: 25px;
  height: 25px;
  border-radius: 2px;
  ${(props: LogoContainerProps) => (props.backgroundColor ? `background-color: ${props.backgroundColor}` : '')}
`;

export default function LoginButton({
  id,
  text,
  Logo,
  color,
  onClick,
  fontWeight,
  backgroundColor,
  logoBackgroundColor,
}: {
  id?: string;
  text?: string;
  Logo?: () => JSX.Element;
  color?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  fontWeight?: string;
  backgroundColor?: string;
  logoBackgroundColor?: string;
}): JSX.Element {
  return (
    <Container
      id={id}
      color={color}
      onClick={onClick}
      fontWeight={fontWeight}
      backgroundColor={backgroundColor}
    >
      <LogoContainer backgroundColor={logoBackgroundColor}>
        {Logo ? <Logo /> : null}
      </LogoContainer>
      {text}
    </Container>
  );
}
