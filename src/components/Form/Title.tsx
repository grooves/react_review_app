import React, { ChangeEvent } from "react";

type TitleProps = {
  title: string;
  changeTitle: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function Title({ title, changeTitle }: TitleProps) {
  return (
    <div className="row">
      <div className="col-4 pr-0 pl-2">
        <label htmlFor="title">タイトル</label>
      </div>
      <div className="col-8">
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => changeTitle(e)}
        />
      </div>
    </div>
  );
}
