import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { DatePicker, DatePickerProps } from '.';

export default {
  title: 'Inputs/DatePicker',
  component: DatePicker,
  args: {
    readOnly: false,
    hasDescription: false,
    hasError: false,
  },
} as Meta<DatePickerProps>;

export const Default: StoryFn<DatePickerProps> = (args) => {
  return (
    <DatePicker
      readOnly={args.readOnly}
      hasDescription={args.hasDescription}
      hasError={args.hasError}
      id="date"
      onChange={(value) => console.log(value)}
      value="2021-01-01"
    />
  );
};
