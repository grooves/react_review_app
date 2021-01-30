import React, { ChangeEvent } from "react";

type ReviewerProps = {
  reviewer: string;
  changeReviewer: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function Reviewer({ reviewer, changeReviewer }: ReviewerProps) {
  return (
    <div className="row">
      <div className="col-4 pr-0 pl-2">
        <label htmlFor="reviewer">書いた人</label>
      </div>
      <div className="col-8">
        <input
          type="text"
          id="reviewer"
          value={reviewer}
          onChange={(e) => changeReviewer(e)}
        />
      </div>
    </div>
  );
}
