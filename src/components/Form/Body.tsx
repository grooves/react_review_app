import React, { ChangeEvent } from "react";

type BodyProps = {
  body: string;
  changeBody: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export function Body({ body, changeBody }: BodyProps) {
  return (
    <div className="row">
      <div className="col-4 pr-0 pl-2">
        <label htmlFor="body">レビュー内容</label>
      </div>
      <div className="col-8">
        <textarea id="body" value={body} onChange={(e) => changeBody(e)} />
      </div>
    </div>
  );
}
