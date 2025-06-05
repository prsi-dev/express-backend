import { getHello } from "./hello.controller";

export interface HelloModule {
  controller: {
    getHello: typeof getHello;
  };
}

export const createHelloModule = (): HelloModule => {
  return {
    controller: {
      getHello,
    },
  };
};
