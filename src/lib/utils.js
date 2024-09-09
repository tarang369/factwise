import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const getUserAge = (dob) => {
    const date = new Date(dob);
    const age = new Date().getFullYear() - date.getFullYear();
    return age;
}

export const getUserFullName = (firstName, lastName) => {
    return `${firstName} ${lastName}`;
}

export const setUserFullName = (fullName) => {
    const [firstName, lastName] = fullName.split(" ");
    return { firstName, lastName };
}

export const getUserGender = (gender) => {
    switch (gender) {
        case "male":
            return "Male";
        case "female":
            return "Female";
        default:
            return "Rather Not Say";
    }
}

export const checkIfAdult = (dob) => {
    const age = getUserAge(dob)
    if (age > 18) {
        return true
    }
    return false
}
