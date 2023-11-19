import { useEffect, useMemo, useState } from "react";


const initialFormValidation: any = {};

export const useForm = (initialForm: any = {}, formValidations: any = {}) => {

    const [formValidation, setFormValidation] = useState(initialFormValidation);
    const [formState, setFormState] = useState(initialForm);

    useEffect(() => {
      createValidators();
    }, [formState]);

    useEffect(() => {
      setFormState(initialForm);
    }, [initialForm]);

    const isFormValid = useMemo(() => {
      for (const formValue of Object.keys(formValidation)) {
        if(formValidation[formValue] !== null) return false;
      }
      return true;
    }, [formValidation]);

    const onInputChange = ({target}: any): void => {
    const {name, value} = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  }

  const onResetForm = () => {
    setFormState(initialForm);
}

  const createValidators = () => {
    const formCheckedValues: any = {};

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField];
      formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
      
    }

    setFormValidation(formCheckedValues);
  }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid,
    }
}