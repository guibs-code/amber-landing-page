import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-amber-500 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-stone-950"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-stone-50">
            You&apos;re on the list!
          </h1>
          
          <p className="text-stone-300 text-lg">
            Thanks for joining the <span className="font-gambarino text-amber-500">amber</span> waitlist.
            We&apos;ll notify you as soon as we launch.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-stone-400 text-sm">
            In the meantime, follow us for updates and behind-the-scenes content.
          </p>
          
          <div className="flex justify-center space-x-4">
            <a
              href="https://twitter.com/ambermoney_co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-amber-500 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://linkedin.com/company/ambermoney"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-amber-500 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

        <Link href="/">
          <Button 
            variant="outline" 
            className="w-full border-stone-700 text-stone-300 hover:bg-stone-800 hover:text-stone-50"
          >
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
} 