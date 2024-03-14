import endpoints from '../endpoints';
import type { Builder } from '../type';

interface User {
  id: number;
  name: string;
  tickets: Array<number>;
  phoneNumber: string;
}

const fetchUsers = (builder: Builder) =>
  builder.query<User[], void>({
    query: () => endpoints.getUsers,
  });

export const appQueries = (builder: Builder) => ({
  fetchUsers: fetchUsers(builder),
});
