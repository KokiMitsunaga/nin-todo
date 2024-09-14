"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        予期せぬエラーが発生しました
      </h1>
      <button
        onClick={() => reset()}
        className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-500"
      >
        リトライ
      </button>
    </div>
  );
}
