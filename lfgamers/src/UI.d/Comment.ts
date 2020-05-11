import { User } from "./User";

export interface Comment {
    _id: string;
    children: Comment[];
    postedBy: string | User;
    postedAt: string;
    title: string;
    text: string;
}