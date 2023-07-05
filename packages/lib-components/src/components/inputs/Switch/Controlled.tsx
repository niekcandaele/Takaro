import { ControlledInputProps } from '../InputProps';
import { useController } from 'react-hook-form';
import { FC } from 'react';
import { GenericSwitch } from '.';
import { defaultInputProps, defaultInputPropsFactory } from '../InputProps';
import { Label } from '../../../components';
import { Container } from './style';
import { Wrapper, Description } from '../layout';

export type ControlledSwitchProps = ControlledInputProps;

const defaultsApplier = defaultInputPropsFactory<ControlledSwitchProps>(defaultInputProps);

export const ControlledSwitch: FC<ControlledSwitchProps> = (props) => {
  const { readOnly, size, name, required, disabled, hint, label, control, description } = defaultsApplier(props);

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <Wrapper>
      <Container>
        {label && (
          <Label
            htmlFor={name}
            text={label}
            position="top"
            error={!!error}
            size={size}
            required={required}
            hint={hint}
            disabled={disabled}
          />
        )}
        <GenericSwitch
          id={name}
          hasError={!!error}
          readOnly={readOnly}
          required={required}
          disabled={disabled}
          name={name}
          size={size}
          onChange={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          ref={field.ref}
          hasDescription={!!description}
        />
      </Container>
      {description && <Description description={description} inputName={name} />}
    </Wrapper>
  );
};
