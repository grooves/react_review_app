import React from "react";

export type FormProps = {
  title: string;
  setTitle: (title: string) => void;
  score: number;
  setScore: (score: number) => void;
  body: string;
  setBody: (body: string) => void;
  reviewer: string;
  setReviewer: (reviewer: string) => void;
};

export function Form({
  title,
  setTitle,
  score,
  setScore,
  body,
  setBody,
  reviewer,
  setReviewer,
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
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
            value={body}
            onChange={(e) => setBody(e.target.value)}
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
            value={reviewer}
            onChange={(e) => setReviewer(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
