import React, {useState }  from 'react';

const SignUp = props => {

  const [user, setUser] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
  });

  const formChangeHandler = event => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    if(!(fieldName === 'passwordConfirmation')){
      setUser({...user, [fieldName]: fieldValue});
    }
  }

  const formSubmitHandler = event => {
    event.preventDefault();
    console.log('Form Submitted');
    console.log(user);
  }



  return(
    <div>
      <form onSubmit={formSubmitHandler}>
        <h1>Sign Up</h1>
        <p>Enter your name:</p>
        <input
          type="text"
          name="name"
          onChange={formChangeHandler}
        />
        <p>Enter your Email:</p>
        <input
          type="text"
          name="email"
          onChange={formChangeHandler}
        />
        <p>Enter your contact:</p>
        <input
          type="text"
          name="contact"
          onChange={formChangeHandler}
        />
        <p>Enter your password:</p>
        <input
          type="password"
          name="password"
          onChange={formChangeHandler}
        />
        <p>Re-Enter your password:</p>
        <input
          type="password"
          name="passwordConfirmation"
          onChange={formChangeHandler}
        />
        <br>
        </br>
        <input type='submit' />
      </form>
    </div>
  );
}

export default SignUp;