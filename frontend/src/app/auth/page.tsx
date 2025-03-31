"use client";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input"; 
import { Label } from "../../components/ui/label";
import { Card } from "../../components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { LockIcon, MailIcon, UserIcon } from "lucide-react";
import { TokenResponse, useGoogleLogin} from "@react-oauth/google";
import OTPEntryPage from "./_components/optpage";
import { redirect } from "next/navigation";
import axios from "axios"
export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isOtpPage,setIsOtpPage ] = useState(false);

  function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  async function waitForOtpVerification(checkInterval = 100, timeout = 30000) {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (localStorage.getItem("otpVerified") === "true") {
          clearInterval(interval);
          resolve(true);
          localStorage.removeItem("otpVerified");
        }
      }, checkInterval);

      setTimeout(() => {
        clearInterval(interval);
        reject(new Error("OTP verification timed out"));
      }, timeout);
    });
  }
  const onSubmit = async ( data: { email?: string; password?: string; name?: string; confirmPassword?:string }) => {
    console.log("Form Data:", data);
    if(isForgotPassword){
      const email=data.email;
      const password=data.password;
      setIsOtpPage(true);
      const otp = generateOTP();
      const message=`Your OTP is ${otp}.Thank You For Registering With Pearl`
      const response = await axios.post(`http://localhost:8080/api/v1/auth/otpVerification`, {
        email,
        otp: message,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(!response){
        throw new Error('Failed to send OTP')
      }
        console.log(otp);
      localStorage.setItem("currentOtp", otp);
      await waitForOtpVerification();
      try{
      localStorage.removeItem("currentOtp");
      console.log("Changing Password");
      // const changePasswordPayload={
      //   email:data.email,
      //   newPassword:data.password
      // }
      // await graphqlClient.request(changePasswordMutation,changePasswordPayload);
      // console.log("Password Changed");
      // const token = await graphqlClient.request<TokendiffResponse>(
      //   verifyCredentialsTokenQuery,
      //   payload
      // );
      // window.localStorage.setItem(
      //   "__Pearl_Token",
      //   token.verifyCredentialsToken as string
      // );
      }catch(err){
        return err;
      }
      reset();
      redirect("/");
    }
    if (isSignUp) {
      const email=data.email;
      const password=data.password;
      const name=data.name;
      if (data.password !== data.confirmPassword) {
        return setError("confirmPassword", {
          type: "manual",
          message: "Passwords do not match",
        });
      }
      setIsOtpPage(true);
      const otp = generateOTP();
      const message=`Your OTP is ${otp}.Thank You For Registering With Pearl`
      const response = await axios.post(`http://localhost:8080/api/v1/auth/otpVerification`, {
        email,
        otp: message,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(!response){
        throw new Error('Failed to send OTP')
      }
      localStorage.setItem("currentOtp", otp);
      await waitForOtpVerification();
      localStorage.removeItem("currentOtp");
      const response2 = await axios.post(`http://localhost:8080/api/v1/auth/register`, {
        name,
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(!response2){
        throw new Error('Failed to register')
      }
      const responseData = await response2.data;
      responseData.token && localStorage.setItem('__Pearl_Token', responseData.token);
    } else {
      const email=data.email;
      const password=data.password;
      const response = await axios.post(`http://localhost:8080/api/v1/auth/authenticate`, {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
       if(!response){
        throw new Error('Failed to authenticate')
       }
       const responseData=await response.data
       responseData.token && localStorage.setItem('__Pearl_Token',responseData.token)
      }
    reset();
    redirect("/home");
  };
  const googlelogin = useGoogleLogin({
    onSuccess: (cred: TokenResponse) => {
      console.log(cred);
      handleLoginGoogle(cred);
    },
    onError: () => console.log("Login Failed"),
    scope: "openid profile email",
  });
  interface GoogleCredential {
    access_token: string;
  }

  interface AuthResponse {
    token: string;
  }

  const handleLoginGoogle = useCallback(async (cred: GoogleCredential) => {
    const token = cred.access_token;
    console.log(token);
    console.log(`${process.env.HTTP_SERVER_URL}/api/v1/auth/google`);
    const response = await axios.post(`http://localhost:8080/api/v1/auth/google`, {
      token,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response) {
      throw new Error('Failed to authenticate');
    }
    const data: AuthResponse = await response.data;
    data.token && localStorage.setItem('__Pearl_Token', data.token);
  redirect("/home");
  }, []);

  return isOtpPage ? (
    <div>
      <OTPEntryPage generateOTP={generateOTP} />
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-black via-orange-950/25 to-black">
      <Card className="w-[400px] bg-black/50 backdrop-blur-xl border border-white/10 shadow-xl rounded-lg">
      <div className="p-6 space-y-6">
        <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-orange-400 via-orange-300 to-orange-200 bg-clip-text text-transparent">
          {isForgotPassword
          ? "Reset Password"
          : isSignUp
            ? "Create Account"
            : "Welcome Back"}
        </h2>
        <p className="text-sm text-gray-400">
          {isForgotPassword
          ? "Enter your email to reset password"
          : isSignUp
            ? "Sign up for an amazing experience"
            : "Sign in to continue your journey"}
        </p>
        </div>
        <AnimatePresence mode="wait">
        {!isForgotPassword && !isSignUp && (
          <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          >
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white py-2 rounded-lg"
            onClick={() => googlelogin()}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="white"
              d="M12 10.2V14h5.6c-.3 1.3-1 2.4-2 3.1v2.6h3.2c1.9-1.8 3-4.3 3-7.1 0-.7-.1-1.3-.2-1.9H12z"
            />
            <path
              fill="orange"
              d="M6.8 14.6l-.9.7-2.5 1.9C5.1 20.8 8.4 23 12 23c3 0 5.5-1 7.4-2.6l-3.2-2.5c-.9.6-2.1 1-3.4 1-2.7 0-5-1.8-5.9-4.3z"
            />
            <path
              fill="orange"
              d="M3.4 6.7C2.5 8.4 2 10.2 2 12c0 1.8.5 3.6 1.4 5.3l3.4-2.6c-.4-1.1-.6-2.2-.6-2.7 0-.6.2-1.6.6-2.7L3.4 6.7z"
            />
            <path
              fill="white"
              d="M12 4.8c1.7 0 3.2.6 4.4 1.7L19.5 4C17.5 2.2 14.9 1 12 1 8.4 1 5.1 3.2 3.4 6.7l3.4 2.6C7 6.8 9.3 4.8 12 4.8z"
            />
            </svg>
            <span className="text-white font-medium">
            Continue With Google
            </span>
          </Button>
          </motion.div>
        )}
        </AnimatePresence>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <AnimatePresence mode="wait">
          {isSignUp && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-2"
          >
            <Label htmlFor="name" className="text-sm text-gray-300">
            Name
            </Label>
            <div className="relative">
            <UserIcon
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              id="name"
              {...register("name")}
              className="pl-10 bg-white/5 border border-white/10 text-white py-2 rounded-lg"
              required
            />
            </div>
          </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm text-gray-300">
          Email
          </Label>
          <div className="relative">
          <MailIcon
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            id="email"
            {...register("email")}
            type="email"
            className="pl-10 bg-white/5 border border-white/10 text-white py-2 rounded-lg"
            required
          />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm text-gray-300">
          Password
          </Label>
          <div className="relative">
          <LockIcon
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            id="password"
            {...register("password")}
            type="password"
            className="pl-10 bg-white/5 border border-white/10 text-white py-2 rounded-lg"
            required
          />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {(isSignUp || isForgotPassword) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="space-y-2"
          >
            <Label
            htmlFor="confirmPassword"
            className="text-sm text-gray-300"
            >
            Confirm Password
            </Label>
            <div className="relative">
            <LockIcon
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              id="confirmPassword"
              {...register("confirmPassword")}
              type="password"
              className="pl-10 bg-white/5 border border-white/10 text-white py-2 rounded-lg"
              required
            />
            </div>
            {errors.confirmPassword &&
            typeof errors.confirmPassword.message === "string" && (
              <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
              </p>
            )}
          </motion.div>
          )}
        </AnimatePresence>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-400 via-orange-300 to-orange-200 text-black font-semibold hover:opacity-90 transition-opacity rounded-lg py-2"
        >
          {isForgotPassword
          ? "Reset Password"
          : isSignUp
            ? "Create Account"
            : "Sign In"}
        </Button>
        </form>

        <Button
        variant="link"
        className="w-full text-gray-400 hover:text-white transition-colors"
        onClick={() => {
          setIsForgotPassword(false);
          setIsSignUp(!isSignUp);
        }}
        >
        {isSignUp
          ? "Already have an account? Sign In"
          : "Don't have an account? Sign Up"}
        </Button>
        {!isSignUp && (
        <Button
          variant="link"
          className="w-full text-gray-400 hover:text-white transition-colors"
          onClick={() => setIsForgotPassword(!isForgotPassword)}
        >
          {isForgotPassword ? "Back to Sign In" : "Forgot Password?"}
        </Button>
        )}
      </div>
      </Card>
    </div>
  );
}
