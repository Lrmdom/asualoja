/**
 * v0 by Vercel.
 * @see https://v0.dev/t/uG9inCvBROD
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Link } from '@remix-run/react'
import SubscribeNews from '~/components/subscribeNews'

export default function Component() {
  return (
    <footer className=" py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-start gap-4">
          <Link to="#" className="flex items-center gap-2">
            <MountainIcon className="h-8 w-8" />
            <span className="text-xl font-bold">Digital Agency</span>
          </Link>
          <p className="text-muted-foreground">
            We are a full-service digital agency specializing in web design,
            development, and digital marketing. Our team of experts can help you
            create a strong online presence and achieve your business goals.
          </p>
          <div className="flex items-center gap-4">
            <Link to="#" aria-label="Twitter">
              <TwitterIcon className="h-6 w-6 hover:text-primary transition-colors" />
            </Link>
            <Link to="#" aria-label="Facebook">
              <FacebookIcon className="h-6 w-6 hover:text-primary transition-colors" />
            </Link>
            <Link to="#" aria-label="LinkedIn">
              <LinkedinIcon className="h-6 w-6 hover:text-primary transition-colors" />
            </Link>
            <Link to="#" aria-label="Instagram">
              <InstagramIcon className="h-6 w-6 hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4">
          <h3 className="text-xl font-bold">Quick Links</h3>
          <nav className="flex flex-col gap-2">
            <Link
              to="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Services
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Portfolio
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex flex-col items-start gap-4">
          <h3 className="text-xl font-bold">Contact Us</h3>
          <p className="text-muted-foreground">
            123 Main Street, Anytown USA
            <br />
            Phone: (123) 456-7890
            <br />
            Email: info@digitalagency.com
          </p>
          <Link
            href="#"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Contact Us
          </Link>
        </div>
      </div>
      <div className="container mx-auto mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
        &copy; 2024 Digital Agency. All rights reserved.
      </div>
    </footer>
  )
}

function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function LinkedinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}
