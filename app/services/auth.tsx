interface Response {
    token: string;
    user: {
        name: string;
        email: string;
        password: string;
    }
}

export function logIn(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'ajsdhflajkshdkfljaldsfhkajsfdklaskdjhlajsdhf',
        user: {
          name: 'test',
          email: 'test@test.com',
          password: '1234',
        },
      });
    }, 2000);
  });
}
