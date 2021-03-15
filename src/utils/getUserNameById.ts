import { UserStruct } from "interfacesAndTypes";

const getUserNameById = (userId: string, usersData: UserStruct[]): string => {
  let name: string = "not found";

  if (usersData.length) {
    const userData: UserStruct | undefined = usersData.find(
      (user: UserStruct) => user.id === userId
    );

    if (userData) {
      name = userData.name;
    }
  }

  return name;
};

export default getUserNameById;
