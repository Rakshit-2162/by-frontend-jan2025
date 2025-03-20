import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../modal/User";

// Define the shape of context
type UserContextType = {
    following: User[];  // List of followed users
    followUser: (user: User) => void;  // Method to follow/unfollow
};

// Create context with proper typing and default as undefined
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [following, setFollowing] = useState<User[]>([]);

    // Function to toggle follow/unfollow
    const followUser = (user: User) => {
        setFollowing((current) => {
            const isFollowing = current.some((u) => u.id === user.id);
            return isFollowing
                ? current.filter((u) => u.id !== user.id) // Unfollow
                : [...current, user]; // Follow
        });
    };

    return (
        <UserContext.Provider value={{ following, followUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use user context
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUserContext must be used within a UserProvider");
    return context;
};
