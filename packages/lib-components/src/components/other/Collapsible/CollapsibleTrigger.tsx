import {
  cloneElement,
  ForwardedRef,
  forwardRef,
  HTMLProps,
  isValidElement,
  PropsWithChildren,
  ReactElement,
} from 'react';
import { useCollapsibleContext } from './CollapsibleContext';
import { AiOutlineCaretRight as ArrowRight } from 'react-icons/ai';
import { styled } from '../../../styled';

const Container = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text};
  margin-right: ${({ theme }) => theme.spacing[1]};
  padding: ${({ theme }) => theme.spacing['0_5']};
  margin-bottom: ${({ theme }) => theme.spacing['0_5']};
  border: 1px solid ${({ theme }) => theme.colors.backgroundAccent};

  svg {
    fill: ${({ theme }) => theme.colors.text};
  }
`;

export type TriggerProps = HTMLProps<HTMLElement> & PropsWithChildren<{ asChild?: boolean }>;
export const CollapsibleTrigger = forwardRef<HTMLElement, TriggerProps>(({ children, asChild }, ref) => {
  const { setOpen, open } = useCollapsibleContext();

  const handleClick = () => {
    setOpen(!open);
  };

  if (asChild && isValidElement(children)) {
    const existingOnClick = children.props.onClick;
    const mergedOnClick = () => {
      existingOnClick && existingOnClick();
      handleClick();
    };

    return cloneElement(children as ReactElement, {
      onClick: mergedOnClick,
      role: 'button',
    });
  } else {
  }

  return (
    <Container onClick={handleClick} aria-expanded={open} tabIndex={0} ref={ref as ForwardedRef<HTMLButtonElement>}>
      {' '}
      {children}
      <ArrowRight size={15} />
    </Container>
  );
});
