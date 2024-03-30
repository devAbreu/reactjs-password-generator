export const ASCII_LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
export const ASCII_UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
export const DIGITS = '0123456789'
export const PUNCTUATION = `!"#$%&'()*+,-./:;<=>?@[\]^_\`{|}~`;

const shuffleArray = (array) => {
    // Loop from back to front
    for (let i = array.length - 1; i > 0; i--) {
        // Choose a random index before the actual element
        let j = Math.floor(Math.random() * (i + 1));
        // swap [a,b] by [b,a]
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const getRandomChar = (str) => {
    let randomIndex = Math.floor(Math.random() * str.length);
    return str[randomIndex];
};

export const generatePassword = (length = 10, opt) => {
    let characters = "";
    if (opt.lowercase) {
        characters += ASCII_LOWERCASE;
    }
    if (opt.uppercase) {
        characters += ASCII_UPPERCASE;
    }
    if (opt.numbers) {
        characters += DIGITS;
    }
    if (opt.symbols) {
        characters += PUNCTUATION;
    }

    // Ensures that at least one char of each type is present
    let result = "";
    let typesCount = 0; // Type completion counter
    if (opt.lowercase && !result.includes(ASCII_LOWERCASE)) {
        result += getRandomChar(ASCII_LOWERCASE);
        typesCount++;
    }
    if (opt.uppercase && !result.includes(ASCII_UPPERCASE)) {
        result += getRandomChar(ASCII_UPPERCASE);
        typesCount++;
    }
    if (opt.numbers && !result.includes(DIGITS)) {
        result += getRandomChar(DIGITS);
        typesCount++;
    }
    if (opt.symbols && !result.includes(PUNCTUATION)) {
        result += getRandomChar(PUNCTUATION);
        typesCount++;
    }

    // Generates the rest of the random password
    for (let i = result.length; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Adjust the length if necessary to comply with the type count
    if (result.length > length) {
        result = result.slice(0, length);
    } else {
        while (result.length < length && typesCount < 4) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
            typesCount++;
        }
    }

    result = shuffleArray(result.split("")).join("");
   
    return result;
};


