import { JSX } from "react";

export type ItemStatus = "Problem Statement" | "Code" | "Test Cases";

export type Item = {
  id: number;
  status: ItemStatus;
};

export type editorLayout = {
  id: ItemStatus;
  className:string;
};