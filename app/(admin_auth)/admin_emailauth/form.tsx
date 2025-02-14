"use client";
import { PinInput } from "@mantine/core";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { instance } from "@/src/api/instance";


const EmailAuthForm = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0); // Timer state in seconds
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email");

  // Mutation to verify email
  const { mutate: verifyEmail, isPending } = useMutation({
    mutationFn: (data: any) => instance.post("/auth/verify-email", data),
    mutationKey: ["auth", "verifyMail"],
    onSuccess() {
      // console.log(response);
      toast.success("Verification Successful");
      // cookieStorage.setItem("access_token", response.data?.data?.token);
      router.push(`/admin_login`);
    },
    onError(error: any) {
      console.error(error?.response?.data);
      toast.error(error?.response?.data?.message || "Action Failed");
    },
  });

  // Mutation to resend OTP
  const { mutate: resendOTP } = useMutation({
    mutationFn: (data: any) => instance.post("/auth/resend-otp", data),
    mutationKey: ["auth", "resendOtp"],
    onSuccess() {
      toast.success("OTP Resent Successfully");
      setTimer(30); // Start 30-second countdown
      setIsResendDisabled(true); // Disable button during countdown
    },
    onError(error: any) {
      console.error(error?.response?.data);
      toast.error(error?.response?.data?.message || "Failed to resend OTP");
    },
  });

  const handleSubmit = () => {
    if (otp === "") {
      toast.error("OTP cannot be empty.");
      return;
    }

    if (!email) {
      toast.error("Email parameter is missing.");
      return router.push("/signup");
    }

    try {
      const decodedEmail = atob(email as string);
      const values = { otp, email: decodedEmail };
      console.log("Submitting values:", values);
      verifyEmail(values);
    } catch (error) {
      toast.error("Failed to decode email. Please try again.");
      console.error(error);
    }
  };

  const handleResendCode = () => {
    if (!email) {
      toast.error("Email parameter is missing.");
      return router.push("/signup");
    }

    try {
      const decodedEmail = atob(email as string);
      resendOTP({ email: decodedEmail });
    } catch (error) {
      toast.error("Failed to decode email. Please try again.");
      console.error(error);
    }
  };

  // Countdown timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false); // Enable the resend button when the timer ends
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  return (
    <div className="flex justify-center mt-14">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <Image
            src="/images/email.png"
            alt="email_icon"
            width={70}
            height={35}
            className="mx-auto"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Verify your email address
        </h2>
        <p className="text-sm text-gray-600 mb-8">
          We have emailed a four-digit code to{" "}
          <span className="font-medium text-gray-800">
            {email ? atob(email) : "your email"}
          </span>
          .{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Incorrect?
          </a>
        </p>

        {/* Code Input */}
        <div className="flex justify-center space-x-4 mb-6">
          <PinInput
            length={6}
            placeholder=" "
            onChange={(value) => setOtp(value)}
          />
        </div>

        <button
          onClick={handleSubmit}
          type="submit"
          className={`px-10 py-3 bg-[#001D69] text-white rounded mb-5 transition ${
            isPending && "opacity-50"
          }`}
        >
          {isPending ? "Submitting..." : "Submit"}
        </button>

        {/* Resend Code and Timer */}
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <button
            onClick={handleResendCode}
            disabled={isResendDisabled}
            className={`${
              isResendDisabled
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-500 hover:underline"
            }`}
          >
            Resend Code
          </button>
          <span>|</span>
          <span>{timer > 0 ? `00:${timer.toString().padStart(2, "0")}` : ""}</span>
        </div>
      </div>
    </div>
  );
};

export default EmailAuthForm;
