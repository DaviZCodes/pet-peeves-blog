import { useState, createContext, ReactNode } from "react";

type UserContextProviderProps = {
  children: ReactNode;
};

/*
for now, the user only has a string: the username
in the future, i might add email or other credentials
so I will have to write a type UserInfo to define the credentials and values for userinfo
*/

export const UserContext = createContext<{
  userInfo: string | null;
  setUserInfo: (userInfo: string | null) => void;
}>({
  userInfo: null,
  setUserInfo: () => {},
});

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [userInfo, setUserInfo] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
