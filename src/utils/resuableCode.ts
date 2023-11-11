// generate random string
export const generateRandomString = (RequiredLength) => {
    let newString = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < RequiredLength; i++) {
        let randomCharacter = characters.charAt(Math.floor(Math.random() * charactersLength));
        newString += randomCharacter;
    }
    return newString;
};

export function generateOTP(length) {
    // Declare a digits variable 
    // which stores all digits
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < length; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };