import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary-dark/5 to-cream-light px-4">
      <div className="max-w-md text-center space-y-6">
        <div className="w-24 h-24 mx-auto rounded-full bg-lavender/20 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-primary/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="font-heading text-3xl font-bold text-primary">
          Sayfa bulunamadi
        </h1>
        <p className="text-foreground/60">
          Aradiginiz sayfa tasinmis veya kaldirilmis olabilir. Ana sayfaya donerek
          yolculugunuza devam edebilirsiniz.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-white shadow-lg hover:bg-primary-light transition-colors"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Ana sayfaya don
        </Link>
      </div>
    </div>
  );
}
