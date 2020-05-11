import { User } from "./User";
import { Comment } from './Comment';

export interface Thread {
    _id: string;
    postedBy: User;
    postedAt: string;
    originalComment: Comment;
}