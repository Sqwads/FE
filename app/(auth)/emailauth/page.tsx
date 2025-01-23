import { Suspense } from "react";
import EmailAuthForm from "./form";


const EmailAuth = () => {
  return (
    <div>
      <Suspense>
        <EmailAuthForm/>
      </Suspense>
    </div>
  );
};

export default EmailAuth;
