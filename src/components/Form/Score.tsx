import React, { ChangeEvent } from "react";

type ScoreProps = {
  score: number;
  changeScore: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function Score({ score, changeScore }: ScoreProps) {
  return (
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
          onChange={(e) => changeScore(e)}
        />
      </div>
    </div>
  );
}
