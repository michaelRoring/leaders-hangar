export interface User {
  uid: string;
  app_metadata: UserAppMetadata;
  user_metadata: UserMetadata;
  aud: string;
  confirmation_sent_at?: string;
  recovery_sent_at?: string;
  email_change_sent_at?: string;
  new_email?: string;
  new_phone?: string;
  invited_at?: string;
  action_link?: string;
  email?: string;
  phone?: string;
  created_at: string;
  confirmed_at?: string;
  email_confirmed_at?: string;
  phone_confirmed_at?: string;
  last_sign_in_at?: string;
  role?: string;
  updated_at?: string;
  identities?: UserIdentity[];
  is_anonymous?: boolean;
  factors?: Factor[];
}
export interface UserAppMetadata {
  provider?: string;
  [key: string]: any;
}

export interface UserMetadata {
  // [key: string]: any;
  email?: string;
  email_verified?: boolean;
  first_name?: string;
  last_name?: string;
  phone_verified?: boolean;
  sub?: string;
}

export interface UserIdentity {
  id: string;
  user_id: string;
  identity_data?: {
    [key: string]: any;
  };
  identity_id: string;
  provider: string;
  created_at?: string;
  last_sign_in_at?: string;
  updated_at?: string;
}

/**
 * A MFA factor.
 *
 * @see {@link GoTrueMFAApi#enroll}
 * @see {@link GoTrueMFAApi#listFactors}
 * @see {@link GoTrueMFAAdminApi#listFactors}
 */
export interface Factor {
  /** ID of the factor. */
  id: string;

  /** Friendly name of the factor, useful to disambiguate between multiple factors. */
  friendly_name?: string;

  /**
   * Type of factor. `totp` and `phone` supported with this version
   */
  factor_type: "totp" | "phone" | (string & {});

  /** Factor's status. */
  status: "verified" | "unverified";

  created_at: string;
  updated_at: string;
}

export interface UserInformation {
  uid: string;
  name: string;
  email: string;
  avatar: string;
  first_name?: string;
}
