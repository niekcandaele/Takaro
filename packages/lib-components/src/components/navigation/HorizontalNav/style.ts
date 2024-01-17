import { styled } from '../../../styled';
import { motion } from 'framer-motion';
import { HorizontalNavVariant } from '.';

export const NavBar = styled.nav<{ variant: HorizontalNavVariant }>`
  display: flex;
  position: relative;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing[1]};

  ${({ variant, theme }) => {
    switch (variant) {
      case 'block':
        return `
          background-color: ${theme.colors.backgroundAlt}; 
          width: fit-content;
          padding: ${theme.spacing['0_75']} ${theme.spacing['0_75']};
          border-radius: ${theme.borderRadius.medium};
        `;
      case 'underline':
        return `
          border-bottom: 1px solid ${theme.colors.backgroundAccent};
          width: 100%;
          padding-bottom: ${theme.spacing['0_75']};
        `;
    }
  }}

  a {
    position: relative;
    ${({ variant, theme }) => {
      switch (variant) {
        case 'block':
          return `
            font-size: ${theme.fontSize.mediumLarge};
            font-weight: bold;
            padding: ${theme.spacing['0_75']};
          `;
        case 'underline':
          return `
            font-weight: 500;
            padding: 0 ${theme.spacing['0_75']};
          `;
      }
    }}
    border-radius: ${({ theme }) => theme.borderRadius.small};
    ${({ variant, theme }) => {
      switch (variant) {
        case 'underline':
          return `
            font-weight: 500;
            padding: 0 ${theme.spacing['0_75']};
          `;
        case 'block':
          return `
            font-size: ${theme.fontSize.medium};
            font-weight: bold;
            padding: ${theme.spacing['0_75']};
          `;
      }
    }}
color: ${({ theme }) => theme.colors.textAlt};
<<<<<<< HEAD
    color: ${({ theme }) => theme.colors.textAlt};
=======
    text-color: ${({ theme }) => theme.colors.textAlt};
    font-weight: ${({ variant }) => (variant === 'block' ? 'bold' : 'normal')};
    font-size: ${({ theme }) => theme.fontSize.medium};
>>>>>>> origin/main

    &.active {
      color: ${({ theme }) => theme.colors.text};
    }

    span {
      position: relative;
      z-index: 10;
    }
  }
`;

export const Underline = styled(motion.div)`
  position: absolute;
  bottom: -${({ theme }) => theme.spacing['0_75']};
  left: 0px;
  display: block;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.primary};
  content: '';
  width: 100%;
`;

export const Block = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0px;
  z-index: 1;
  display: block;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  content: '';
  width: 100%;
`;
