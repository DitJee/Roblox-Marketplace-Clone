import * as React from 'react';

import { User } from '../interfaces';

type ListDetailProps = {
  item: User;
};

const ListDetail = ({ item: user }: ListDetailProps) => (
  <div>
    <h1>Detail for {user.name}</h1>
    <div>ID: {user.id}</div>
  </div>
);

export default ListDetail;
