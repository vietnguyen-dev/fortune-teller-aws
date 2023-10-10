import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, ChangeEvent, FormEvent } from "react";

import ai from "@/utils/axios";

const inter = Inter({ subsets: ["latin"] });

type tAnswer = "yes" | "no" | null;

export default function Home() {
  const [question, setQuestion] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [answer, setAnswer] = useState<tAnswer>(null);
  const [background, setBackground] = useState<string>("");

  const handleQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    if (answer !== null) {
      setAnswer(null);
    }
    setQuestion(e.target.value);
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    const properQuestion = question.includes("?");
    if (properQuestion) {
      setError(false);
      const formData = new FormData();

      // Append data to the FormData object
      formData.append("style_id", "29");
      formData.append(
        "prompt",
        `${question} as one of the 12 asian zodiac animals holding the word yes`
      );
      const data = await ai.post("/", formData);
      const blob = data.data;
      // const blob2 = new Blob([blob], { type: "image/png" }); // Change the type accordingly
      // const imageUrl = URL.createObjectURL(blob2);
      // console.log(blob);
      // Set the image URL in the state
      setBackground(blob);
      setQuestion("");
    } else if (!properQuestion) {
      setError(true);
    }
  };

  return (
    <main className={`${inter.className} p-14 h-screen g:p-28`}>
      <div>
        <Image src={background} alt="ai image" width={200} height={200} />
      </div>
      <div id="form-area" className=" absolute bottom-14 p-6 card shadow-xl">
        <h1 className="text-2xl font-bold mb-4">Ask me a Question...</h1>
        <form onSubmit={submitForm} className="flex">
          <div>
            <input
              className="textarea textarea-bordered first-letter:mt-3 p-3 lg:w-96 max-h-32 resize-none rounded border"
              value={question}
              onChange={handleQuestion}
            />
            {error && (
              <p className="text-right text-error mt-1">
                add question mark to end
              </p>
            )}
          </div>
          <button className="btn btn-primary ml-6">SUBMIT</button>
        </form>
        <div>{answer && <h2>{answer}</h2>}</div>
      </div>
    </main>
  );
}
