import { RegistryWidgetsType } from '@rjsf/utils';
import { SelectWidget } from './SelectWidget';
import { RadioWidget } from './RadioWidget';
import { TextareaWidget } from './TextAreaWidget';
import { CheckBoxWidget } from './CheckboxWidget';
import { ItemWidget } from './ItemWidget';

export const customWidgets: RegistryWidgetsType = {
  // IMPORTANT: make sure if you are overriding a widget, that the key matches the name of the widget you are overriding
  select: SelectWidget,
  radio: RadioWidget,
  textarea: TextareaWidget,
  checkbox: CheckBoxWidget,
  item: ItemWidget,
};
