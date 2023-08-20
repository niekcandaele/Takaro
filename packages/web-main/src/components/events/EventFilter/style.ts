import { styled, Select } from '@takaro/lib-components';

export const FilterContainer = styled.div<{ hasMultipleFields: boolean }>`
  display: grid;
  grid-template-columns: ${({ hasMultipleFields }) => (hasMultipleFields ? '20px 1fr 1fr 1fr' : '1fr 1fr 1fr')};
  gap: ${({ theme }) => theme.spacing['1_5']};
  align-items: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing['1_5']};
`;

export const FilterContent = styled.div`
  width: 800px;
  padding: ${({ theme }) => theme.spacing['1_5']};
`;

export const OperatorSelect = styled(Select)`
  max-width: 10px;
`;
