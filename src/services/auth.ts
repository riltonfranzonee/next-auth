import { v4 as uuid } from "uuid";

type SignInInput = {
  email: string;
  password: string;
};

const delay = (amount = 750) =>
  new Promise((resolve) => setTimeout(resolve, amount));

export async function signInRequest(input: SignInInput) {
  await delay();

  return {
    token: uuid(),
    user: {
      name: "Rilton Franozne",
      email: "riltonfranzone@gmail.com",
      avatar: "https://github.com/riltonfranzonee.png",
    },
  };
}

export async function retrieveUserInfo() {
  await delay();

  return {
    name: "Rilton Franozne",
    email: "riltonfranzone@gmail.com",
    avatar: "https://github.com/riltonfranzonee.png",
  };
}
