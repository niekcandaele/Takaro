import { Control, UseFieldArrayRemove, UseFormResetField, useWatch } from 'react-hook-form';
import { SelectField, TextField, Chip, TextAreaField, IconButton, Tooltip, CheckBox } from '@takaro/lib-components';
import { Header } from './style';
import { IFormInputs } from '..';
import { Input, InputType } from 'components/JsonSchemaForm/generator/inputTypes';
import { FC, useEffect, useState } from 'react';
import { AiOutlineDelete as RemoveIcon } from 'react-icons/ai';
import { InputTypeToFieldsMap } from './TypeSpecificFieldsMap';

interface ConfigFieldProps {
  input: Input;
  control: Control<IFormInputs>;
  id: string;
  index: number;
  remove: UseFieldArrayRemove;
  resetField: UseFormResetField<IFormInputs>;
}

export const ConfigField: FC<ConfigFieldProps> = ({ control, index, remove, id, resetField }) => {
  const [initialised, setInitialised] = useState<boolean>(false);
  const output = useWatch<IFormInputs>({
    control,
    name: `configFields.${index}.name`,
  });

  const inputType = useWatch<IFormInputs>({
    control,
    name: `configFields.${index}.type`,
  }) as InputType;

  /* whenever the field type changes we swap all type dependent fields.
    `configFields.${index}.default` has the same name across different inputTypes.
    We need to reset the default value to the new type default value.
  */
  useEffect(() => {
    if (inputType && initialised) {
      switch (inputType) {
        case InputType.boolean:
          resetField(`configFields.${index}.default`, {
            defaultValue: true,
          });
          break;
        case InputType.string:
          resetField(`configFields.${index}.default`, {
            defaultValue: '',
          });
          break;
        case InputType.number:
          resetField(`configFields.${index}.default`, {
            defaultValue: 0,
          });
          break;
        case InputType.item:
          resetField(`configFields.${index}.default`, {
            defaultValue: undefined,
          });
          resetField(`configFields.${index}.multiple`, {
            defaultValue: false,
          });

          break;
        case InputType.enum:
        case InputType.array:
          resetField(`configFields.${index}.default`, {
            defaultValue: undefined,
          });
          break;
      }
    } else {
      setInitialised(true);
    }
  }, [inputType]);

  return (
    <>
      <Header>
        <div>
          <Chip color="primary" label={`Field ${index + 1}`} />
          <h3>{output as string}</h3>
        </div>
        <Tooltip>
          <Tooltip.Trigger asChild>
            <IconButton
              onClick={() => remove(index)}
              icon={<RemoveIcon cursor="pointer" size={18} />}
              ariaLabel="Remove field"
            />
          </Tooltip.Trigger>
          <Tooltip.Content>Remove field</Tooltip.Content>
        </Tooltip>
      </Header>
      <TextField
        control={control}
        label="Name"
        name={`configFields.${index}.name`}
        required
        placeholder="Config field name"
        description="The name of the field. This will be shown to the user."
      />
      <TextAreaField
        control={control}
        label="Description"
        rows={8}
        name={`configFields.${index}.description`}
        placeholder="Enables you to ..."
        required
        description="Describe what this field does. This will be shown to the user."
      />
      <SelectField
        control={control}
        name={`configFields.${index}.type`}
        label="Type"
        render={(selectedItems) => (
          <div>
            {selectedItems.length > 0
              ? Object.values(InputType).find((i) => i == selectedItems[0].value)
              : Object.values(InputType)[0]}
          </div>
        )}
      >
        <SelectField.OptionGroup label="type">
          {Object.values(InputType).map((type) => (
            <SelectField.Option key={`${type}-${id}`} value={type} label={type}>
              <span>{type}</span>
            </SelectField.Option>
          ))}
        </SelectField.OptionGroup>
      </SelectField>
      {InputTypeToFieldsMap(control, index, id)[inputType]}
      <CheckBox
        key={`configFields.${index}.required`}
        control={control}
        label="Is Field required?"
        labelPosition="left"
        name={`configFields.${index}.required`}
        description="Makes sure the field is not empty. E.g. if you are depending on this field in the module code."
      />
    </>
  );
};
