import app from "./initialize";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const auth = getAuth(app);

/**
 * Initializes a reCAPTCHA verifier for phone number authentication.
 */
window.recaptchaVerifier = new RecaptchaVerifier(
   "sign-in-button", // ID of the button triggering the authentication
   {
      size: "invisible",
      callback: (response) => {
         // reCAPTCHA solved, allow signInWithPhoneNumber.
         onSignInSubmit();
      },
   },
   auth
);

/**
 * Submits the phone number for authentication.
 */
const onSignInSubmit = () => {
   const phoneNumber = "+9779817024764"; // Example phone number
   const appVerifier = window.recaptchaVerifier;

   signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
         // SMS sent. Prompt user to type the code from the message, then sign the
         // user in with confirmationResult.confirm(code).
         window.confirmationResult = confirmationResult;
         // ...
      })
      .catch((error) => {
         // Error; SMS not sent
         // ...
      });
};


/*
Initialize Firebase Auth: Initializes Firebase Auth using the Firebase app instance.

Initialize reCAPTCHA Verifier: Creates a reCAPTCHA verifier instance using the RecaptchaVerifier class from Firebase Auth. It sets up the reCAPTCHA size as invisible and provides a callback function when reCAPTCHA is solved.

onSignInSubmit Function: This function submits the phone number for authentication using signInWithPhoneNumber method from Firebase Auth. It catches any errors if SMS is not sent.

The code is well-commented and organized for better understanding of its functionality.
*/