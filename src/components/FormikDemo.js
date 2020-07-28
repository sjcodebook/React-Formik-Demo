import React from 'react';
import {
  Card,
  CardContent,
  TextField,
  Typography,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { Form, Formik, Field, useField } from 'formik';

const initialValues = {
  fullName: '',
  initialInvestment: 0,
  investmentRisk: [],
  commentAboutInvestmentRisk: '',
  dependents: -1,
  acceptedTermsAndConditions: false,
};

export const FormikDemo = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">New Account</Typography>
        <Formik initialValues={initialValues} onSubmit={() => {}}>
          {({ values }) => (
            <Form>
              <Field name="fullName" as={TextField} label="Full Name" />
              <Field
                name="initialInvestment"
                type="number"
                as={TextField}
                label="Initial Investment"
              />
              <MyCheckbox name="investmentRisk" value="High" label="High" />
              <MyCheckbox name="investmentRisk" value="Medium" label="Medium" />
              <MyCheckbox name="investmentRisk" value="Low" label="Low" />
              <Field
                name="commentAboutInvestmentRisk"
                as={TextField}
                multiline
                rows={3}
                rowsMax={10}
              />
              <Field name="dependents" as={TextField} select>
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Field>
              <MyCheckbox
                name="acceptedTermsAndConditions"
                label="Accept Terms And Conditions"
              />
              <pre>{JSON.stringify(values, null, 4)}</pre>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export function MyCheckbox(props) {
  const [field] = useField({
    name: props.name,
    type: 'checkbox',
    value: props.value,
  });

  return (
    <FormControlLabel
      control={<Checkbox {...props} {...field} />}
      label={props.label}
    />
  );
}
