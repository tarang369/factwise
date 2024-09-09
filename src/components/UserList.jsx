/* eslint-disable react/prop-types */

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import InputErrors from "@/components/ui/input-erros";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUserContext } from "@/context/UserContext";
import {
    checkIfAdult,
    getUserAge,
    getUserFullName,
    getUserGender,
} from "@/lib/utils";
import { useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import {
    IoIosCheckmarkCircleOutline,
    IoIosCloseCircleOutline,
} from "react-icons/io";

import DeleteUserDialog from "./DeleteUserDialog";

const UserAccordion = ({ user, isEditing, setIsEditing }) => {
    // states
    const { dispatch } = useUserContext();
    const [isEdited, setIsEdited] = useState(false);
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(true);

    const original_user_data = {
        id: user.id,
        name: getUserFullName(user.first, user.last),
        age: getUserAge(user.dob),
        picture: user.picture,
        gender: user.gender,
        country: user.country,
        description: user.description,
        is_adult: checkIfAdult(user.dob),
    };

    const [userData, setUserData] = useState({
        id: original_user_data.id,
        name: original_user_data.name,
        age: original_user_data.age,
        picture: original_user_data.picture,
        gender: original_user_data.gender,
        country: original_user_data.country,
        description: original_user_data.description,
    });

    // useEffects
    useEffect(() => {
        if (isEditing) {
            validateForm();
        }
    }, [userData, isEditing]);

    // functions
    const validateForm = () => {
        let newErrors = {};

        if (userData.name === "") {
            newErrors.name = "Name cannot be empty";
        }

        if (/\d/.test(userData.name)) {
            newErrors.name = "Name cannot include numbers";
        }

        if (isNaN(userData.age)) {
            newErrors.age = "Age must be a number";
        }

        if (userData.age === "") {
            newErrors.age = "Age cannot be empty";
        }

        if (!userData.country.trim() || /\d/.test(userData.country)) {
            newErrors.country = "Country cannot contain numbers";
        }

        if (userData.country === "") {
            newErrors.country = "Country cannot be empty";
        }

        if (!userData.description.trim()) {
            newErrors.description = "Description cannot be empty";
        }

        setErrors(newErrors);
        setIsFormValid(Object.keys(newErrors).length === 0);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
        setIsEdited(true);
    };

    const handleSave = () => {
        if (isFormValid) {
            const updatedUser = {
                ...userData,
                first: userData.name.split(" ")[0],
                last: userData.name.split(" ")[1],
            };
            dispatch({ type: "UPDATE_USER", payload: updatedUser });
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setUserData(original_user_data);
        setIsEditing(false);
    };

    const handleDelete = () => {
        dispatch({ type: "DELETE_USER", payload: user.id });
    };

    return (
        <AccordionItem
            value={userData.id}
            className="border border-gray-300 rounded-md px-4"
        >
            <AccordionTrigger
                className="[&[data-state=open]>svg]:rotate-180 [&>svg]:w-6 [&>svg]:h-6 [&>svg]:text-gray-400"
                disabled={isEditing}
            >
                <div className="flex flex-row items-center gap-4">
                    <Avatar>
                        <AvatarImage
                            src={userData.picture}
                            alt={userData.name}
                        />
                        <AvatarFallback>
                            {userData.name
                                .split(" ")
                                .map((name) => name[0])
                                .join("")
                                .toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    {isEditing ? (
                        <div className="flex flex-col gap-1">
                            <Input
                                name="name"
                                value={userData.name}
                                className={`text-xl font-semibold ${errors.name ? "border-red-500" : ""}`}
                                onChange={handleInputChange}
                            />
                            <InputErrors error={errors.name} />
                        </div>
                    ) : (
                        <h2 className="text-xl font-semibold">
                            {original_user_data.name}
                        </h2>
                    )}
                </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 px-1">
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col gap-1 w-1/3">
                        <h3 className="text-gray-500">Age</h3>
                        {isEditing ? (
                            <>
                                <Input
                                    name="age"
                                    type="text"
                                    value={userData.age}
                                    className={`text-sm h-8 w-full ${errors.age ? "border-red-500" : ""}`}
                                    onChange={handleInputChange}
                                    inputMode="numeric"
                                    onKeyDown={(e) => {
                                        if (
                                            e.key === "e" ||
                                            e.key === "+" ||
                                            e.key === "-"
                                        ) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                                <InputErrors error={errors.age} />
                            </>
                        ) : (
                            <p>{original_user_data.age} Years</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-1 w-1/3">
                        <h3 className="text-gray-500">Gender</h3>
                        {isEditing ? (
                            <Select
                                value={userData.gender}
                                className="w-full"
                                onValueChange={(e) =>
                                    handleInputChange({
                                        target: { name: "gender", value: e },
                                    })
                                }
                            >
                                <SelectTrigger className="h-8">
                                    <SelectValue placeholder="Gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">
                                        Female
                                    </SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                    <SelectItem value="rather-not-say">
                                        Rather Not Say
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        ) : (
                            <p>{getUserGender(original_user_data.gender)}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-1 w-1/3">
                        <h3 className="text-gray-500">Country</h3>
                        {isEditing ? (
                            <>
                                <Input
                                    name="country"
                                    value={userData.country}
                                    className={`text-sm h-8 w-full ${errors.country ? "border-red-500" : ""}`}
                                    onChange={handleInputChange}
                                />
                                <InputErrors error={errors.country} />
                            </>
                        ) : (
                            <p>{original_user_data.country}</p>
                        )}
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex flex-col gap-1">
                        <h3 className=" text-gray-500">Description</h3>
                        {isEditing ? (
                            <>
                                <Textarea
                                    style={{ height: "160px" }}
                                    name="description"
                                    value={userData.description}
                                    className={`text-sm h-8 w-full ${errors.description ? "border-red-500" : ""}`}
                                    onChange={handleInputChange}
                                />
                                <InputErrors error={errors.description} />
                            </>
                        ) : (
                            <p>{original_user_data.description}</p>
                        )}
                    </div>
                </div>
                <div className="flex flex-row gap-4 justify-end px-1">
                    {isEditing ? (
                        <>
                            <button onClick={handleCancel}>
                                <IoIosCloseCircleOutline
                                    color="red"
                                    size={24}
                                />
                            </button>
                            <button
                                disabled={!isEdited || !isFormValid}
                                onClick={handleSave}
                            >
                                <IoIosCheckmarkCircleOutline
                                    color={
                                        isEdited && isFormValid
                                            ? "green"
                                            : "gray"
                                    }
                                    size={24}
                                />
                            </button>
                        </>
                    ) : (
                        <>
                            <DeleteUserDialog
                                user={userData}
                                onDelete={handleDelete}
                            />
                            <button
                                disabled={!original_user_data.is_adult}
                                onClick={() => setIsEditing(true)}
                            >
                                <BsPencil
                                    color={
                                        !original_user_data.is_adult
                                            ? "gray"
                                            : "blue"
                                    }
                                    size={20}
                                />
                            </button>
                        </>
                    )}
                </div>
            </AccordionContent>
        </AccordionItem>
    );
};

export function UserList() {
    const {
        state: { filtered_users },
    } = useUserContext();
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="w-full md:w-1/2 lg:w-3/5 mt-4 max-w-lg">
            <Accordion
                type="single"
                collapsible
                className="w-full flex flex-col gap-4"
            >
                {filtered_users.map((celebrity) => (
                    <UserAccordion
                        key={celebrity.id}
                        user={celebrity}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                    />
                ))}
            </Accordion>
        </div>
    );
}
