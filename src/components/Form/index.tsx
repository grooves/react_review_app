import React, { ChangeEvent } from "react";
import { Title } from "./Title";
import { Score } from "./Score";
import { Body } from "./Body";
import { Reviewer } from "./Reviewer";

export type FormDataProps = {
  title: string;
  score: number;
  body: string;
  reviewer: string;
};

export type FormProps = {
  formData: FormDataProps;
  changeTitle: (e: ChangeEvent<HTMLInputElement>) => void;
  changeScore: (e: ChangeEvent<HTMLInputElement>) => void;
  changeBody: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  changeReviewer: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function Form({
  formData,
  changeTitle,
  changeScore,
  changeBody,
  changeReviewer,
}: FormProps) {
  return (
    <>
      <Title title={formData.title} changeTitle={changeTitle} />
      <Score score={formData.score} changeScore={changeScore} />
      <Body body={formData.body} changeBody={changeBody} />
      <Reviewer reviewer={formData.reviewer} changeReviewer={changeReviewer} />
    </>
  );
}
