import { SchemaObject } from 'ajv';
import { Input, InputType } from './inputTypes';
import { StrictRJSFSchema } from '@rjsf/utils';

interface SchemaToInputsError {
  message: string;
  detail: string;
  data: object;
}

export interface SchemaToInputsResult {
  inputs: Input[];
  errors: SchemaToInputsError[];
}

export function schemaToInputs(schema: SchemaObject): SchemaToInputsResult {
  const inputs: Input[] = [];
  const errors: SchemaToInputsError[] = [];

  // should have properties and start with object
  if (schema.type !== 'object') {
    errors.push({
      message: 'Failed to parse config fields',
      detail: 'Schema does not contain any properties.',
      data: schema as object,
    });
    return { inputs, errors };
  }

  Object.entries(schema.properties).forEach(([name, propertySchema]) => {
    const property = propertySchema as StrictRJSFSchema;
    try {
      const input: Record<string, any> = {
        name,
        type: property.type,
        required: schema.required.includes(name),
      };

      if (property.default !== undefined && property.default !== null) {
        input.default = property.default as any;
      }

      if (property.description) {
        input.description = property.description;
      }

      // Legacy: initially we used the integer type for numbers
      // But this does not allow for floating point numbers.
      // As a fallback we convert integer to number
      if (input.type === 'integer') {
        input.type = InputType.number;
      }

      // input.type are the default JSON Schema types
      switch (input.type) {
        case 'number':
          if (property['x-component'] === InputType.duration) {
            input.type = InputType.duration;
          } else {
            if (property.minimum) {
              input.minimum = property.minimum;
            }
            if (property.maximum) {
              input.maximum = property.maximum;
            }
          }
          break;

        case 'string':
          if (property['x-component'] === InputType.item) {
            input.type = InputType.item;
            input.multiple = false;
          } else if (property['x-component'] === InputType.country) {
            input.type = InputType.country;
            input.multiple = false;
          } else if (property.enum) {
            input.type = InputType.select;
            input.multiple = false;
            input.values = property.enum;
          } else {
            // InputType.string
            input.minLength = property.minLength;
            input.maxLength = property.maxLength;
          }
          break;
        case 'array':
          // default array type should not set the input.multiple
          if (property['x-component'] === InputType.item) {
            input.type = InputType.item;
            input.multiple = true;
          } else if (property['x-component'] === InputType.country) {
            input.type = InputType.country;
            input.multiple = true;
          } else if (property['x-component'] === InputType.select) {
            input.type = InputType.select;
            input.values = (property.items as any)['enum'];
            input.multiple = true;
          } else if (property.items!['type'] !== 'string') {
            throw new Error('property.items.type MUST be of type string');
          } else {
            if (property.minItems) {
              input.minItems = property.minItems;
            }
            if (property.maxItems) {
              input.maxItems = property.maxItems;
            }
            if (property.uniqueItems) {
              input.uniqueItems = property.uniqueItems;
            }
          }
          break;

        case 'boolean':
          break;

        default:
          throw new Error('Unknown input type');
      }
      inputs.push(input as Input);
    } catch (e) {
      errors.push({
        message: `Error processing config field: '${name}'. Please try to recreate the field using the config details.`,
        detail: 'The following config field could not be processed.',
        data: property as object,
      });
    }
  });
  return { inputs, errors };
}
