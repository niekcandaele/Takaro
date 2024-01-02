import { styled } from '@takaro/lib-components';

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  h3 {
    margin-bottom: ${({ theme }) => theme.spacing['0_25']};
  }
  p {
    width: fit-content;
    text-transform: lowercase;
  }
`;

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;
