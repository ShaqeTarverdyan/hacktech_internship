import React, { useState } from 'react';
import { connect } from 'react-redux';
import { logIn } from '../../store/actions/authActions';

import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import Input from '../UI/Input';
import Button from '../UI/Button';

import { Container, FormWrapper, StyledForm } from '../../generalStyles';

const SignIn = ({ logIn }) => {

    return (
        <Container>
            <FormWrapper>
                <Formik
                  initialValues={{
                    email: '',
                    password: ''
                  }}
                  // validationSchema={}
                  onSubmit = {async(values, {setSubmitting}) => {
                    await logIn(values);
                    setSubmitting(false)
                  }}
                >
                  {
                    ({isValid, setSubmitting}) => (
                        <StyledForm>
                            <h1>LogIn</h1>
                            <Field
                              type="email"
                              name="email"
                              placeholder="Email"
                              component={Input}
                            />
                            <Field
                              type="password"
                              name="password"
                              placeholder="Password"
                              component={Input}
                            />
                            <Button disabled={!isValid || setSubmitting} type="submit">Login</Button>
                        </StyledForm>
                    )
                  }
                </Formik>
            </FormWrapper>
        </Container>
    )
}

const mapStateToProps = state => {
  console.log(state)
  return {}
}

const mapDispatchtoState = dispatch => {
  return {
    logIn: (admin) => dispatch(logIn(admin))
  }
}

export default connect(mapStateToProps, mapDispatchtoState)(SignIn);