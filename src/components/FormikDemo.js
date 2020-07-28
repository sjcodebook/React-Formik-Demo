import React from 'react';
import {
  Card,
  CardContent,
  TextField,
  Typography,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Box,
  Container,
  Button,
} from '@material-ui/core';
import { Form, Formik, Field, useField, ErrorMessage } from 'formik';
import { object, string, number, boolean, array, mixed } from 'yup';

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
    <Container fixed>
      <Card>
        <CardContent>
          <Typography variant="h4">New Account</Typography>
          <Formik
            validationSchema={object({
              fullName: string()
                .required('Name is mandatory!!!')
                .min(2)
                .max(100),
              initialInvestment: number().required().min(100),
              dependents: number().required().min(0).max(5),
              acceptedTermsAndConditions: boolean().oneOf([true]),
              investmentRisk: array(
                string().oneOf(['High', 'Medium', 'Low'])
              ).min(1),
              commentAboutInvestmentRisk: mixed().when('investmentRisk', {
                is: (investmentRisk) =>
                  investmentRisk.find((el) => el === 'High'),
                then: string().required().min(20).max(100),
                otherwise: string().min(20).max(100),
              }),
            })}
            initialValues={initialValues}
            onSubmit={(values, formikHelpers) => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve();
                }, 2000);
              });
            }}
          >
            {({ values, errors, isSubmitting, isValidating }) => (
              <Form>
                <Box marginBottom={2}>
                  <FormGroup>
                    <Field name="fullName" as={TextField} label="Full Name" />
                    <ErrorMessage name="fullName" />
                  </FormGroup>
                </Box>
                <Box marginBottom={2}>
                  <FormGroup>
                    <Field
                      name="initialInvestment"
                      type="number"
                      as={TextField}
                      label="Initial Investment"
                    />
                    <ErrorMessage name="initialInvestment" />
                  </FormGroup>
                </Box>
                <Box marginBottom={2}>
                  <label>Select the risk you want to take:</label>
                  <FormGroup>
                    <MyCheckbox
                      name="investmentRisk"
                      value="High"
                      label="High"
                    />
                    <MyCheckbox
                      name="investmentRisk"
                      value="Medium"
                      label="Medium"
                    />
                    <MyCheckbox name="investmentRisk" value="Low" label="Low" />
                  </FormGroup>
                  <ErrorMessage name="investmentRisk" />
                </Box>
                <Box marginBottom={2}>
                  <FormGroup>
                    <Field
                      name="commentAboutInvestmentRisk"
                      as={TextField}
                      multiline
                      rows={3}
                      rowsMax={10}
                      label="Comment About Investment Risk"
                    />
                  </FormGroup>
                  <ErrorMessage name="commentAboutInvestmentRisk" />
                </Box>
                <Box marginBottom={2}>
                  <FormGroup>
                    <Field
                      name="dependents"
                      as={TextField}
                      select
                      label="Dependents"
                    >
                      <MenuItem value={-1}>Select</MenuItem>
                      <MenuItem value={0}>0</MenuItem>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Field>
                    <ErrorMessage name="dependents" />
                  </FormGroup>
                </Box>
                <Box marginBottom={2}>
                  <FormGroup>
                    <MyCheckbox
                      name="acceptedTermsAndConditions"
                      label="Accept Terms And Conditions"
                    />
                    <ErrorMessage name="acceptedTermsAndConditions" />
                  </FormGroup>
                </Box>

                <Button type="submit" disabled={isSubmitting || isValidating}>
                  Submit
                </Button>

                <pre>{JSON.stringify(errors, null, 4)}</pre>
                <pre>{JSON.stringify(values, null, 4)}</pre>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Container>
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
