export class ClientUser {
  firstName: string;
  lastName: string;
  email: string;
}
export class Role {
  clientRole: boolean;
  composite: boolean;
  containerId: string;
  id: string;
  name: string;
}

export class BudegaUser {
  createdTimestamp: number;
  clientRoles: Role;
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  emailVerified: boolean;
  enabled: boolean;
  attributes: Record<string, string>;
}
