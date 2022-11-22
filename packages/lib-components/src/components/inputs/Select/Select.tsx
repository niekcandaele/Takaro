// TODO: implement required, test error display, add grouped example, implement setShowError
import {
  FC,
  Children,
  cloneElement,
  isValidElement,
  useRef,
  useState,
  useLayoutEffect,
  PropsWithChildren,
} from 'react';
import { SelectContext } from './context';
import {
  GroupLabel,
  SelectButton,
  SelectContainer,
  ArrowIcon,
  ErrorContainer,
  Error,
} from './style';
import { Label } from '../../../components';

import {
  useFloating,
  offset,
  flip,
  useListNavigation,
  useTypeahead,
  useInteractions,
  useRole,
  useClick,
  useDismiss,
  FloatingFocusManager,
  autoUpdate,
  FloatingOverlay,
  size,
} from '@floating-ui/react-dom-interactions';

import { useController } from 'react-hook-form';
import {
  InputProps,
  defaultInputPropsFactory,
  defaultInputProps,
} from '../InputProps';

export interface SelectProps extends InputProps {
  render: (selectedIndex: number) => React.ReactNode;
}

const defaultsApplier =
  defaultInputPropsFactory<PropsWithChildren<SelectProps>>(defaultInputProps);

// TODO: implement required (but this should only be done after the label reimplementation.
export const Select: FC<PropsWithChildren<SelectProps>> = (props) => {
  const {
    required,
    name,
    size: componentSize,
    label,
    render,
    error,
    children,
    control,
    value,
    disabled,
  } = defaultsApplier(props);

  const listItemsRef = useRef<Array<HTMLLIElement | null>>([]);
  const listContentRef = useRef([
    'Select...',
    ...(Children.map(children, (child) =>
      Children.map(
        isValidElement(child) && child.props.children,
        (child) => child.props.value
      )
    ) ?? []),
  ]);

  const { field } = useController({
    name,
    control,
    defaultValue: Math.max(0, listContentRef.current.indexOf(value)),
  });

  const [open, setOpen] = useState(false);
  const [showError] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(
    Math.max(0, listContentRef.current.indexOf(value))
  );

  const [pointer, setPointer] = useState(false);

  if (!open && pointer) {
    setPointer(false);
  }

  const { x, y, reference, floating, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      /* TODO: is this rem, px? something else? */
      offset(5),
      flip({ padding: 8 }),
      size({
        apply({ rects, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            maxHeight: `${availableHeight}px`,
          });
        },
        padding: 8,
      }),
    ],
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [
      useClick(context),
      useRole(context, { role: 'listbox' }),
      useDismiss(context),
      useListNavigation(context, {
        listRef: listItemsRef,
        activeIndex,
        selectedIndex,
        onNavigate: setActiveIndex,
      }),
      useTypeahead(context, {
        listRef: listContentRef,
        onMatch: open ? setActiveIndex : setSelectedIndex,
        activeIndex,
        selectedIndex,
      }),
    ]
  );

  // Scroll the active or selected item into view when in `controlledScrolling`
  // mode (i.e. arrow key nav).
  useLayoutEffect(() => {
    if (open && activeIndex != null && !pointer) {
      requestAnimationFrame(() => {
        listItemsRef.current[activeIndex]?.scrollIntoView({
          block: 'nearest',
        });
      });
    }
  }, [open, activeIndex, pointer]);

  let optionIndex = 0;

  const options = [
    ...(Children.map(
      children,
      (child) =>
        isValidElement(child) && (
          <ul
            key={child.props.label}
            role="group"
            aria-labelledby={`select-${child.props.label}`}
          >
            <GroupLabel
              role="presentation"
              id={`select-${child.props.label}`}
              aria-hidden="true"
            >
              {child.props.label}
            </GroupLabel>
            {Children.map(child.props.children, (child) =>
              cloneElement(child, {
                index: 1 + optionIndex++,
                onChange: field.onChange,
              })
            )}
          </ul>
        )
    ) ?? []),
  ];

  return (
    <SelectContext.Provider
      value={{
        selectedIndex,
        setSelectedIndex,
        activeIndex,
        setActiveIndex,
        listRef: listItemsRef,
        setOpen,
        getItemProps,
        dataRef: context.dataRef,
      }}
    >
      {label && (
        <Label
          error={!!error}
          text={label}
          required={required}
          position="top"
          size={componentSize}
          disabled={disabled}
        />
      )}
      <SelectButton
        {...getReferenceProps({
          ref: reference,
        })}
        isOpen={open}
      >
        {render(selectedIndex - 1)}
        <ArrowIcon size={18} isOpen={open} />
      </SelectButton>
      {error && (
        <ErrorContainer showError={!open && showError}>
          <Error>{error.message}</Error>
        </ErrorContainer>
      )}
      {open && (
        <FloatingOverlay lockScroll>
          <FloatingFocusManager context={context} initialFocus={selectedIndex}>
            <SelectContainer
              {...getFloatingProps({
                ref: floating,
                style: {
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                  overflow: 'auto',
                },
                onPointerMove() {
                  setPointer(true);
                },
                onKeyDown(event) {
                  setPointer(false);
                  if (event.key === 'Tab') {
                    setOpen(false);
                  }
                },
              })}
            >
              {options}
            </SelectContainer>
          </FloatingFocusManager>
        </FloatingOverlay>
      )}
    </SelectContext.Provider>
  );
};
