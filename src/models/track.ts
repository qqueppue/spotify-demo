import type { SimplifiedAlbum } from "./album";
import type { Artist } from "./artist";
import type { ExternalUrls, Image, Restriction } from "./commonType";

export interface Track {
  album?: SimplifiedAlbum;
  artists?: Artist[];
  available_markets?: string[];
  disc_number?: number;
  duration_ms?: number;
  explicit?: boolean;
  external_ids?: {
    isrc: string;
    ean: string;
    upc: string;
  };
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  is_playable?: boolean;
  linked_from?: Track;
  restrictions?: Restriction;

  name?: string;
  popularity?: number;
  preview_url?: string | null;
  track_number?: number;
  type?: "track";
  is_local?: boolean;
}

export interface Episode {
  // audio_preview_url: string | null;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_playable: boolean;
  // language?: string;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: string;
  resume_point?: {
    fully_played?: boolean;
    resume_position_ms?: number;
  };
  type: string;
  uri: string;
  restrictions: Restriction;
  show: Show;
}

export type SimplifiedEpisode = Omit<Episode, "show">;

export interface Show {
  available_markets: string[];
  copyrights: CopyRights;
  description: string;
  html_description: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: string;
  uri: string;
  total_episodes: number;
}

export interface CopyRights {
  text?: string;
  type?: string;
}

export interface SimplifiedAudio {
  author: { name: string }[];
  available_markets: string[];
  copyrights: CopyRights;
  description: string;
  html_description: string;
  edition?: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  languages: string[];
  media_type: string;
  name: string;
  narrators: { name: string; }[];
  publisher: string;
  type: "audiobook";
  uri: string;
  total_chapters: number;
}
