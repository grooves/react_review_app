import React, { ChangeEvent } from "react";

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
      <div className="row">
        <div className="col-4 pr-0 pl-2">
          <label htmlFor="title">タイトル</label>
        </div>
        <div className="col-8">
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => changeTitle(e)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-4 pr-0 pl-2">
          <label htmlFor="score">評価</label>
        </div>
        <div className="col-8">
          <input
            type="number"
            min={1}
            max={5}
            id="score"
            value={formData.score}
            onChange={(e) => changeScore(e)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-4 pr-0 pl-2">
          <label htmlFor="body">レビュー内容</label>
        </div>
        <div className="col-8">
          <textarea
            id="body"
            value={formData.body}
            onChange={(e) => changeBody(e)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-4 pr-0 pl-2">
          <label htmlFor="reviewer">書いた人</label>
        </div>
        <div className="col-8">
          <input
            type="text"
            id="reviewer"
            value={formData.reviewer}
            onChange={(e) => changeReviewer(e)}
          />
        </div>
      </div>
    </>
  );
}
