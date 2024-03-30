
import { useEffect, useState, useRef } from 'react';
import { ASCII_LOWERCASE, ASCII_UPPERCASE, DIGITS, PUNCTUATION, generatePassword } from './utils';
import { useClipboard } from './hooks/useClipboard';
import toast, { Toaster } from 'react-hot-toast';
import { ThemeIcon } from './components/toggleTheme.jsx';

const notify = () => toast.success('Password copied to clipboard.');
const notifyerr = () => toast.error('Error copying password to clipboard.');

function App() {


  const [passwordLength, setPasswordLength] = useState(8);
  const [options, setOptions] = useState({ lowercase: true, numbers: true, symbols: false, uppercase: true });
  const [inputValue, setInputValue] = useState("");
  const [animatedValue, setAnimatedValue] = useState(""); // useState to handle the animation
  const { copiedText, copyToClipboard } = useClipboard();
  const inputRef = useRef(null)

  const handleOptions = (e) => {
    setOptions({
      ...options,
      [e.target.name]: e.target.checked,
    })
  };
  const handlePasswordLength = (e) => {
    setPasswordLength(parseInt(e.target.value))
  };

  const handleGeneratePassword = (pwLength, options) => {
    let passwordResult = generatePassword(pwLength, options);
    setInputValue(passwordResult)
  };
  const handleClick = () => {
    copyToClipboard(inputRef.current?.value || '')
      .then(() => notify())
      .catch(() => notifyerr())
  }
  // Logic to handle password animation
  useEffect(() => {
    let animationFrame;
    const availableCharacters = `${ASCII_LOWERCASE}${ASCII_UPPERCASE}${DIGITS}${PUNCTUATION}`;
    let currentIndex = 0;

    const animatePassword = () => {
      if (currentIndex <= inputValue.length) {
        const randomString = inputValue
          .substring(0, currentIndex)
          .concat(Array.from({ length: inputValue.length - currentIndex }, () => availableCharacters.charAt(Math.floor(Math.random() * availableCharacters.length))).join(''));
        setAnimatedValue(randomString);
        currentIndex++;
        animationFrame = requestAnimationFrame(animatePassword);
      }
    };

    if (inputValue) {
      animatePassword();
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [inputValue]);

  useEffect(() => {
    handleGeneratePassword(passwordLength, options);

  }, [])
  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="container">

        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">

            <div className="card shadow p-5 bg-body-tertiary border border-0">
              <div className="d-flex justify-content-end">
                <ThemeIcon />
              </div>
              <div className="card-body text-center">
                <h5 className="card-title mb-5">PASSWORD GENERATOR</h5>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="password" aria-label="password" value={animatedValue} readOnly aria-describedby="basic-addon1" ref={inputRef} />
                  <span className="input-group-text" id="basic-addon1"><i role="button" className="fa-solid fa-copy" aria-labelledby="copyicon" onClick={handleClick}></i></span>
                </div>

                <label htmlFor="customRange1" className="form-label">Select Password Length</label>
                <div className="d-flex align-items-center mb-3">
                  <input
                    type="range"
                    className="form-range me-2"
                    id="customRange1"
                    onChange={handlePasswordLength}
                    value={passwordLength}
                    min={1}
                    max={30}
                  />
                  <span className="roboto-medium">{passwordLength}</span>
                </div>
                <div className='row'>
                  <div className="col-6">
                    <input className="form-check-input" name="lowercase" type="checkbox" defaultChecked value={options.lowercase} id="flexCheckLowercase" onChange={handleOptions} />
                    <label className="ms-2 form-check-label" htmlFor="flexCheckLowercase">
                      Lowercase
                    </label>
                  </div>
                  <div className="col-6">
                    <input className="form-check-input" name="numbers" type="checkbox" defaultChecked value={options.numbers} id="flexCheckNumbers" onChange={handleOptions} />
                    <label className="ms-2 form-check-label" htmlFor="flexCheckNumbers">
                      Numbers
                    </label>
                  </div>
                </div>
                <div className='row'>
                  <div className="col-6">
                    <input className="form-check-input" name="uppercase" type="checkbox" defaultChecked value={options.uppercase} id="flexCheckUppercase" onChange={handleOptions} />
                    <label className="ms-2 form-check-label" htmlFor="flexCheckUppercase">
                      Uppercase
                    </label>
                  </div>
                  <div className="col-6">
                    <input className="form-check-input" name="symbols" type="checkbox" value={options.symbols} id="flexCheckSymbols" onChange={handleOptions} />
                    <label className="ms-2 form-check-label" htmlFor="flexCheckSymbols">
                      Symbols
                    </label>
                  </div>
                </div>
                <button type='button' className="btn btn-primary mt-4" onClick={() => { handleGeneratePassword(passwordLength, options); }}>GENERATE PASSWORD</button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Toaster />
    </div>
  )
}

export default App
