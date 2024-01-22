import React from 'react';
import { RJSFSchema } from '@rjsf/utils';
import { JsonSchemaForm } from '..';
import { styled, Button } from '@takaro/lib-components';
import { InputType } from '../generator/inputTypes';

const Container = styled.div`
  width: 100%;
  padding: 2rem;
`;

export default {
  title: 'Schema/Widgets/Duration',
};

export const Default = () => {
  const schema: RJSFSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    properties: {
      duration: {
        type: 'number',
      },
    },
  };

  const uiSchema = {
    duration: {
      'ui:widget': InputType.duration,
    },
  };

  return (
    <Container>
      <JsonSchemaForm schema={schema} initialData={{}} uiSchema={uiSchema}>
        <Button type="submit" text="Submit" />
      </JsonSchemaForm>
    </Container>
  );
};
