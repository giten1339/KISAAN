import app from "./initialize";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

const auth = getAuth(app);

window.recaptchaVerifier = new RecaptchaVerifier(
   "sign-in-button",
   {
      size: "invisible",
      callback: (response) => {
         // reCAPTCHA solved, allow signInWithPhoneNumber.
         onSignInSubmit();
      },
   },
   auth
);

onSignInSubmit = () => {
   const phoneNumber = "+9779817024764";
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
