type FileJsonAddEdit = {
  id: number;
  directory_id: number;
  title: string;
  description: string;
  object_type?: number;
  object_id?: number;
  is_directory?: number;
  origin?: string;
  data_uri?: string;
  ip_address?: string;
};

type FileJson = FileJsonAddEdit & {
  company_id: number;
  creator_id: number;
  md5_hash: string;
  file_path: string;
  width: number;
  height: number;
  randomcode: string;
  extension: string;
  size_in_byte: number;
  date_created: number;
  date_modified: number;
  url: string;
};

type ThumbnailAction = "resize" | "crop" | "fill";

export type { FileJson, FileJsonAddEdit, ThumbnailAction };
