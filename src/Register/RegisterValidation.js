function Rvalidation(values){
    let errors = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if(values.name === ""){
        errors.name = "Name is required";
    } else if (values.name.length < 3){
        errors.name = "Name needs to be more than 3 characters";
    } else if (values.name.length > 15){
        errors.name = "Name needs to be less than 15 characters";
    }

    if(values.email === ""){
        errors.email = "Email is required";
    } else if (!email_pattern.test(values.email)){
        errors.email = "Email is invalid";
    }

    if(values.password === ""){
        errors.password = "Password is required";
    }
    else if (!password_pattern.test(values.password)){
        errors.password = "Password needs to be more than 8 characters and contain at least one letter and one number";
    }

    return errors;
}

export default Rvalidation;