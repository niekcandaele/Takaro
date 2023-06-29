import {
  useClick,
  useDismiss,
  useInteractions,
  useFloating,
  autoUpdate,
  offset,
  FloatingPortal,
  FloatingFocusManager,
} from '@floating-ui/react';
import { FC } from 'react';
import { styled } from '../../../styled';

const FloatingContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.elevation[3]};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  z-index: ${({ theme }) => theme.zIndex.dropdown};
`;

const ReferenceContainer = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export interface DropdownProps {
  renderFloating: JSX.Element;
  renderReference: JSX.Element;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const Dropdown: FC<DropdownProps> = ({
  renderFloating,
  renderReference,
  open,
  setOpen,
}) => {
  const { x, y, strategy, refs, context } = useFloating<HTMLDivElement>({
    open,
    onOpenChange: setOpen,
    placement: 'bottom',
    middleware: [offset({ mainAxis: 2 })],
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context),
  ]);

  return (
    <>
      <ReferenceContainer
        ref={refs.setReference}
        {...getReferenceProps({
          onClick(event) {
            event.stopPropagation();
          },
        })}
      >
        {renderReference}
      </ReferenceContainer>
      {open && (
        <FloatingPortal>
          <FloatingFocusManager context={context}>
            <FloatingContainer
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                zIndex: 1000,
              }}
              {...getFloatingProps()}
            >
              {renderFloating}
            </FloatingContainer>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
};
