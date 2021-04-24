export interface Subtitle {
  id?: number;
  tc_in: number;
  tc_out: number;
  text_versions: SubtitleTextVersions[];
}

export interface SubtitleTextVersions {
  lang: number;
  text: string;
}
