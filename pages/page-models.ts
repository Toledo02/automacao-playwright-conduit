export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegistrationData extends AuthCredentials {
  username: string;
}

export interface ArticleDraft {
  title: string;
  description: string;
  body: string;
  tags?: string[];
}

export interface ArticleUpdateData {
  title?: string;
  description?: string;
  body?: string;
  tags?: string[];
}

export interface ProfileUpdateData {
  image?: string;
  username?: string;
  bio?: string;
  email?: string;
  password?: string;
}
