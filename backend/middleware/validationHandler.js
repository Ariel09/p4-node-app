export const registerValidation = (req, res, next) => {
  const {username, fullName, email, password } = req.body;

  if (!username || !fullName || !email || !password){
    res.status(400);
    throw new Error('All fields are required!');
  }

  if(/[^a-zA-Z0-9_]/.test(username)){
    res.status(400);
    throw new Error('Username must not contain special character!');
  }

  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    res.status(400);
    throw new Error('Please enter a valid email!');
  }

  if(password.length < 8){
    res.status(400);
    throw new Error('Password must be atleast 8 character long!');
  }

  next();
}

const checkAmount = (amount) => {
  const value = amount.split('');
  let check = false;
  for(let i = 1; i <= value.length; i++){
    if(value[i] === '-'){
      check = true;
    }
  }

  return check;
}

export const transactionValidation = (req, res, next) => {
  const {amount, type, category} = req.body;

  if(!amount || !type || !category){
    res.status(400);
    throw new Error('All field must have value!')
  }

  if(checkAmount(amount)){
    res.status(400);
    throw new Error('Please enter a valid number!');
  }

  next();
}