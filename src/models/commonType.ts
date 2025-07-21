export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  url: string;
  height: number | null;
  witdh: number | null;
}

export interface Restriction {
    reason?: string
}

export interface Followers {
  href: string;
  total: number;
}

export interface ExplicitContent {
  filter_enabled: boolean | null;
  filter_locked: boolean;
}

export interface Owner {
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  type?: string;
  uri?: string;
  display_name?: string | null;
}