
// if i want to make handleChange a dynamic function i'll need to pass (ev, formData, setFormData, errors, setErrors, schema, setIsFormValid) 


export const handleChange = (ev, formData, setFormData, errors, setErrors, schema, setIsFormValid) => {
    const { name, value } = ev.target;

    // Update the form data directly
    const updatedFormData = {
        ...formData,
        [name]: value
    };

    setFormData(updatedFormData);
    // console.log(updatedFormData);

    // Validate against schema
    const { error } = schema.validate(updatedFormData, { abortEarly: false });

    // Update errors state
    const updatedErrors = { ...errors };

    // Reset errors for the current field
    delete updatedErrors[name];


    // Populate errors if validation fails for the current field only
    if (error) {
        error.details.forEach((err) => {
            if (err.path[0] === name) { // Only update the error for the current field
                updatedErrors[err.path[0]] = err.message;
            }
        });
    }

    if (name in updatedErrors && value === "") {
        delete updatedErrors[name];
    }

    setErrors(updatedErrors);

    // Determine form validity
    const formIsValid = Object.keys(updatedErrors).length === 0;

    setIsFormValid(formIsValid);
};