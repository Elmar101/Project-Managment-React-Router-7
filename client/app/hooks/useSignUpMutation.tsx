import { postData } from "@/libs/fetch-util";
import type { SignUpFormType } from "@/routes/auth/sign-up";
import { useMutation } from "@tanstack/react-query"

export const useSignUpMutation = () => {
    return useMutation({
        mutationFn:  (userData: SignUpFormType) => {
            // Simulate an API call for user registration
            console.log("Signing up user", userData);
            return postData("/auth/register", userData);
        },
        onSuccess: (data) => {
            console.log("User signed up successfully", data);
        },
        onError: (error) => {
            console.error("Error signing up user", error);
        },
    });
}