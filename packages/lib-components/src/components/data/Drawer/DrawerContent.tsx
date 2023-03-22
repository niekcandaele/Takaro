import { styled } from '../../../styled';
import { getTransition } from '../../../helpers';
import { motion } from 'framer-motion';

import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useMergeRefs,
} from '@floating-ui/react';
import { forwardRef } from 'react';
import { useDrawerContext } from './DrawerContext';

const StyledFloatingOverlay = styled(FloatingOverlay)`
  background: rgba(0, 0, 0, 0.8);
  display: grid;
  place-items: end;
  max-height: 100vh;
`;

const Container = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing['2_5']}`};
  width: 460px;
  height: 100vh;
  max-height: 100vh;
  min-height: 100%;
`;

export const DrawerContent = forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>((props, propRef) => {
  const { context: floatingContext, ...context } = useDrawerContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  return (
    <FloatingPortal>
      {context.open && (
        <StyledFloatingOverlay lockScroll>
          <FloatingFocusManager context={floatingContext}>
            <Container
              ref={ref}
              aria-labelledby={context.labelId}
              aria-describedby={context.descriptionId}
              {...context.getFloatingProps(props)}
              initial={{ x: '100%' }}
              animate={{
                x: 0,
              }}
              exit={{
                x: '100%',
              }}
              transition={getTransition()}
            >
              {props.children}
            </Container>
          </FloatingFocusManager>
        </StyledFloatingOverlay>
      )}
    </FloatingPortal>
  );
});
