
import { Input } from "../../@/components/ui/input"
import { Button } from "../../@/components/ui/button"

export default function Component() {
  return (
    <div className=" container flex w-full max-w-5xl flex-col items-center justify-center gap-8 px-4 py-12 md:flex-row md:gap-16 md:px-6 lg:py-16 xl:py-24">
      <div className="flex flex-col items-start gap-4 text-center md:text-left">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Stay up to date with our newsletter
        </h2>
        <p className="max-w-md text-muted-foreground md:text-xl">
          Subscribe to our newsletter to receive the latest updates, news, and exclusive offers directly in your inbox.
        </p>
      </div>
      <div className="w-full max-w-md space-y-2">
        <form className="flex gap-2">
          <Input type="email" placeholder="Enter your email" className="flex-1" required />
          <Button type="submit">Subscribe</Button>
        </form>
        <p className="text-xs text-muted-foreground">
          We respect your privacy. Your email address will not be shared with any third parties.
        </p>
      </div>
    </div>
  )
}