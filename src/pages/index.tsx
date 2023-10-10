import { Inter } from "next/font/google";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

type tAnswer = "yes" | "no" | null;

const fortuneTeller = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API!,
  timeout: 1000,
  headers: {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
  },
});

export default function Home() {
  const [question, setQuestion] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [answer, setAnswer] = useState<tAnswer>(null);

  const handleQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    if (answer !== null) {
      setAnswer(null);
    }
    setQuestion(e.target.value);
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    const isQuestion = question.includes("?");
    if (isQuestion) {
      if (error === true) {
        setError(false);
      }
      const data = await fortuneTeller.get("");
      setAnswer(data.data);
    } else {
      setError(true);
    }
  };

  const clear = () => {
    setQuestion("");
  };

  return (
    <main
      className={`${inter.className} p-14 h-screen g:p-28 flex justify-center`}
    >
      <div id="form-area" className="p-6 shadow-xl ">
        <h1 className="text-2xl font-bold mb-4">Ask a Question...</h1>
        <form onSubmit={submitForm} className="flex">
          <div>
            <input
              className="textarea textarea-bordered first-letter:mt-3 p-3 lg:w-96 max-h-32 resize-none rounded border"
              value={question}
              onChange={handleQuestion}
            />
            {error && (
              <p className="text-right text-error mt-1 mask mask-hexagon">
                add question mark to end
              </p>
            )}
          </div>
          <button className="btn btn-primary ml-6" type="submit">
            SUBMIT
          </button>
          <button
            className="btn btn-secondary ml-6"
            type="button"
            onClick={clear}
          >
            CLEAR
          </button>
        </form>
        <div className="w-96 h-96 flex justify-center items-center">
          {answer && <h2 className="text-3xl">{answer}</h2>}
        </div>
      </div>
    </main>
  );
}
