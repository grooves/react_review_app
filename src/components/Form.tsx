import React from "react";

export type FormDataProps = {
  title: string;
  score: number;
  body: string;
  reviewer: string;
};

export type FormProps = {
  formData: FormDataProps;
  setFormData: (formData: FormDataProps) => void;
};

export function Form({ formData, setFormData }: FormProps) {
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
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
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
            onChange={(e) =>
              setFormData({ ...formData, score: Number(e.target.value) })
            }
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
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
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
            onChange={(e) =>
              setFormData({ ...formData, reviewer: e.target.value })
            }
          />
        </div>
      </div>
    </>
  );
}
