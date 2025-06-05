export interface HelloResponse {
  message: string;
  timestamp: string;
  path: string;
}

export const getHelloMessage = (path: string): HelloResponse => ({
  message: "Hello, World!",
  timestamp: new Date().toISOString(),
  path,
});
