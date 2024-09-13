export type ScheduleArray = Schedule[];
export type ListArray = List[];

export interface Schedule {
  day: number;
  list: List[];
}

export interface List {
  id: number;
  code: string;
  names: Names;
  franchises: FranchiseElement[];
  announce: null | string;
  status: Status;
  posters: Posters;
  updated: number;
  last_change: number;
  type: TypeClass;
  genres: string[];
  team: Team;
  season: Season;
  description: null | string;
  in_favorites: number;
  blocked: Blocked;
  player: Player;
  torrents: Torrents;
}

export interface Blocked {
  copyrights: boolean;
  geoip: boolean;
  geoip_list?: unknown[];
}

export interface FranchiseElement {
  franchise: FranchiseFranchise;
  releases: Release[];
}

export interface FranchiseFranchise {
  id: string;
  name: string;
}

export interface Release {
  id: number;
  code: string;
  ordinal: number;
  names: Names;
}

export interface Names {
  ru: string;
  en: string;
  alternative: null | string;
}

export interface Player {
  alternative_player: null | string;
  host: Host;
  is_rutube: boolean;
  episodes: Episodes;
  list: EpisodeInfo[];
  rutube?: Rutube;
}

export interface Episodes {
  first: number | null;
  last: number;
  string: string;
}

export enum Host {
  CacheLibriaFun = "cache.libria.fun",
}

export interface EpisodeInfo {
  episode: number | number;
  name: null | string;
  uuid: string;
  created_timestamp: number;
  preview: null | string;
  skips: Skips;
  hls: HLS;
}

export interface HLS {
  fhd: null | string;
  hd: string;
  sd: string;
}

export interface Skips {
  opening: number[];
  ending?: unknown[];
}

export type Rutube = object | unknown;

export interface Posters {
  small: Medium;
  medium: Medium;
  original: Medium;
}

export interface Medium {
  url: string;
  raw_base64_file: null;
}

export interface Season {
  string: SeasonString;
  code: number;
  year: number;
  week_day: number;
}

export enum SeasonString {
  Весна = "весна",
  Лето = "лето",
  Осень = "осень",
}

export interface Status {
  string: StatusString;
  code: number;
}

export enum StatusString {
  ВРаботе = "В работе",
}

export interface Team {
  voice: string[];
  translator: string[];
  editing: string[];
  decor: string[];
  timing: string[];
}

export interface Torrents {
  episodes: Episodes;
  list: TorrentsList[];
}

export interface TorrentsList {
  torrent_id: number;
  episodes: Episodes;
  quality: Quality;
  leechers: number;
  seeders: number;
  downloads: number;
  total_size: number;
  size_string: string;
  url: string;
  magnet: string;
  uploaded_timestamp: number;
  hash: string;
  metadata: null;
  raw_base64_file: null;
}

export interface Quality {
  string: QualityString;
  type: TypeEnum;
  resolution: Resolution;
  encoder: Encoder;
  lq_audio: null;
}

export enum Encoder {
  H264 = "h264",
  H265 = "h265",
}

export enum Resolution {
  The1080P = "1080p",
  The720P = "720p",
}

export enum QualityString {
  BDRIP1080P = "BDRip 1080p",
  BDRIP1080PHEVC = "BDRip 1080p HEVC",
  DVDRIP1080P = "DVDRip 1080p",
  TVRIP720P = "TVRip 720p",
  WEBRIP1080P = "WEBRip 1080p",
  WEBRIP1080PHEVC = "WEBRip 1080p HEVC",
}

export enum TypeEnum {
  BDRIP = "BDRip",
  DVDRIP = "DVDRip",
  TVRIP = "TVRip",
  WEBRIP = "WEBRip",
}

export interface TypeClass {
  full_string: string;
  code: number;
  string: TypeString;
  episodes: number | null;
  length: number | null;
}

export enum TypeString {
  Movie = "MOVIE",
  Ona = "ONA",
  Tv = "TV",
}
