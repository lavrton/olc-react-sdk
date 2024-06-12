// src/components/Grid.js
import React from 'react';

// styled components
import styled from 'styled-components';

interface GridItemProps {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

const breakpoints = {
  xs: '0px',
  sm: '600px',
  md: '960px',
  lg: '1280px',
  xl: '1920px',
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -8px;
  gap: 10px;
`;

const Col = styled.div<GridItemProps>`
  padding: 0 8px;
  box-sizing: border-box;
  ${(props) =>
    props.xs &&
    `flex: 0 0 ${(props.xs / 12) * 100}%; 
    max-width: ${
      (props.xs / 12) * 100
    }%;`}
  @media (min-width: ${breakpoints.sm}) {
    ${(props) =>
      props.sm &&
      `flex: 0 0 ${(props.sm / 12) * 100}%; 
      max-width: ${
        (props.sm / 12) * 100
      }%;`}
  }
  @media (min-width: ${breakpoints.md}) {
    ${(props) =>
      props.md &&
      `flex: 0 0 ${(props.md / 12) * 100}%; 
      max-width: ${
        (props.md / 12) * 100
      }%;`}
  }
  @media (min-width: ${breakpoints.lg}) {
    ${(props) =>
      props.lg &&
      `flex: 0 0 ${(props.lg / 12) * 100}%; 
      max-width: ${
        (props.lg / 12) * 100
      }%;`}
  }
  @media (min-width: ${breakpoints.xl}) {
    ${(props) =>
      props.xl &&
      `flex: 0 0 ${(props.xl / 12) * 100}%; 
      max-width: ${
        (props.xl / 12) * 100
      }%;`}
  }
`;

export const GridContainer = ({children}: any) => {
  return <Container>{children}</Container>;
};

export const GridItem = ({xs, sm, md, lg, xl, children}: any) => {
  return (
    <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      {children}
    </Col>
  );
};
