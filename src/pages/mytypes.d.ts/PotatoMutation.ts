/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: PotatoMutation
// ====================================================

export interface PotatoMutation_login {
  __typename: "LoginOutput";
  ok: boolean;
  token: string | null;
  error: string | null;
}

export interface PotatoMutation {
  login: PotatoMutation_login;
}

export interface PotatoMutationVariables {
  email: string;
  password: string;
}
