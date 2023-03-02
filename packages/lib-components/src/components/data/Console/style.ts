import { styled } from '../../../styled';
import { Button } from '../../actions';

export const Wrapper = styled.div`
  height: auto;
  background-color: ${({ theme }) => theme.colors.background};
  position: relative;
  border-radius: 1rem;
`;
export const StyledButton = styled(Button)`
  position: absolute;
  top: 1rem;
  right: 10px;
  z-index: 2;
`;

export const Container = styled.div`
  overflow: visible;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding-top: ${({ theme }) => theme.spacing[5]};
  z-index: 1;
`;
