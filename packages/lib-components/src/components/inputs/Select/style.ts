import { styled } from '../../../styled';

// This wraps everything
export const Container = styled.div`
  display: relative;
  margin-bottom: ${({ theme }) => theme.spacing['2']};
`;

export const SelectButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  width: 100%;
  cursor: pointer;
  font-family: inherit;
  padding: ${({ theme }) => `${theme.spacing['0_75']} ${theme.spacing['1_5']}`};
  outline: 0;
  position: relative;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border: 2px solid ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  & > div {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[1]};
  }
  font-weight: 500;

  span {
    display: flex;
  }
`;

export const SelectContainer = styled.div`
  list-style-type: none;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing['0_75']};
  outline: 0;
  border: 0.2rem solid ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  box-shadow: ${({ theme }) => theme.elevation[4]};
`;

export const GroupLabel = styled.li`
  padding: ${({ theme }) => `${theme.spacing['0_5']} ${theme.spacing[0]}`};
  opacity: 0.5;
  padding: ${({ theme }) => `${theme.spacing['0_5']} ${theme.spacing['1_5']}`};
`;
