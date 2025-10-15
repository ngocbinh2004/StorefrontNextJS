import { FileJson } from "../types/File";

type ListItemSimplePhoto = {
  files: FileJson[];
  file_id_list: number[];
};

type ListItemSimple = {
  key: string;
  title: string;
  description: string;
  link: string;
  photo: ListItemSimplePhoto;
};

type ListInputItem = ListItemSimple & {
  children?: ListItemSimple[];
};

type ListInputItems<T = ListInputItem> = T[];

interface ListInputProps {
  value?: ListInputItems;
  onChange?: (value: ListInputItems) => void;
  className?: string;
  imageLabel?: string | React.ReactNode;
  imageWidth?: number;
  contentLabel?: string | React.ReactNode;
  titleLabel?: string | React.ReactNode;
  descriptionLabel?: string | React.ReactNode;
  linkLabel?: string | React.ReactNode;
  disableSubMenu?: boolean;
}

export type {
  ListInputProps,
  ListInputItems,
  ListInputItem,
  ListItemSimple,
  ListItemSimplePhoto,
};
