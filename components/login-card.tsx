'use client'
import { FaApple, FaGoogle } from "react-icons/fa"
import { FaMeta } from "react-icons/fa6"
import AuthCard from "./ui/auth-card"
import InputField from "./ui/input-field"
import PasswordField from "./ui/password-field"
import CheckboxField from "./ui/checkbox-field"
import SocialButton from "./ui/social-button"
import Button from "./ui/button"
import { useRouter } from "next/navigation"

export default function LoginCard() {
  const router = useRouter()
  return (
    <AuthCard>
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-1">
        Sign up
      </h2>

      <p className="text-center text-sm text-gray-500 mb-6">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-primary-accent font-medium hover:underline"
        >
          Log in
        </a>
      </p>

      <div className="space-y-4">
        <InputField placeholder="First name*" />
        <InputField placeholder="Last name*" />
        <InputField type="email" placeholder="Email address*" />
        <PasswordField placeholder="Password (8+ characters)*" />
      </div>

      <div className="mt-4 mb-6">
        <CheckboxField id="terms">
          I agree to Aps's{" "}
          <a href="#" className="text-primary-accent underline">
            Terms & Conditions
          </a>{" "}
          and acknowledge the{" "}
          <a href="#" className="text-primary-accent underline">
            Privacy Policy
          </a>
        </CheckboxField>
      </div>

      <Button className="w-full mb-4"
      onClick={() => {
        router.push('/dashboard')
        alert("Account created!")}} 
      >
        Create account
      </Button>

      <div className="flex gap-3">
        <SocialButton className="bg-black text-white hover:bg-gray-900">
          <FaApple className="w-4 h-4" />
        </SocialButton>

        <SocialButton className="bg-white border border-gray-200 hover:bg-gray-50">
          <FaGoogle className="w-4 h-4 text-[#4285F4]" />
        </SocialButton>

        <SocialButton className="bg-[#1877F2] text-white hover:bg-[#1560c8]">
          <FaMeta className="w-4 h-4" />
        </SocialButton>
      </div>
    </AuthCard>
  )
}