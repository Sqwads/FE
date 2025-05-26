import { Suspense } from "react";
import MentorEmailAuthForm from "./mentorform";


const EmailAuth = () => {
  return (
    <div>
      <Suspense>
        <MentorEmailAuthForm/>
      </Suspense>
    </div>
  );
};

export default EmailAuth;
