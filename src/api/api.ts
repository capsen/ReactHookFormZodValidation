// src/api/api.ts
export const fetchInitialData = async () => {
    return new Promise<{ name: string; email: string; age: number }>((resolve) => {
      setTimeout(() => {
        resolve({
          name: 'John Doe',
          email: 'john.doe@example.com',
          age: 30,
        });
      }, 1000);
    });
  };
  