/* eslint-disable react/prop-types */

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IoTrashOutline } from "react-icons/io5";

const DeleteUserDialog = ({ user, onDelete }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <IoTrashOutline color="red" size={20} />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogTitle className="text-md font-normal">
                    Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-lg px-8 font-normal">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-500 hover:bg-red-600 rounded-lg px-8 font-normal"
                        onClick={() => onDelete(user.id)}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteUserDialog;
