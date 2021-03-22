import { Icon, TextField } from '@shopify/polaris';
import { Field } from 'formik';
import React from 'react';

// label, placeholder, type are in other props
function FormField({ name, icon, error, ...otherProps }) {
  return (
    <Field name={name}>
      {({
        field: { value },
        form: { dirty, setFieldValue, setFieldTouched, isSubmitting },
        meta: { touched, error: fieldError, initialValue },
      }) => (
        <TextField
          prefix={<Icon source={icon} />}
          labelAction={{
            content: 'Set default',
            onAction: () => setFieldValue(name, initialValue),
          }}
          align='left'
          clearButton
          onClearButtonClick={() => setFieldValue(name, '')}
          id={name}
          name={name}
          value={value}
          error={
            (touched || dirty) &&
            (fieldError
              ? fieldError
              : error && error.toLowerCase().includes('mail') && error)
          }
          onBlur={() => setFieldTouched(name)}
          onChange={value => setFieldValue(name, value)}
          disabled={isSubmitting}
          {...otherProps}
        />
      )}
    </Field>
  );
}

export default FormField;
