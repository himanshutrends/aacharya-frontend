import {
    Bird,
    Book,
    Bot,
    Code2,
    CornerDownLeft,
    LifeBuoy,
    Mic,
    Rabbit,
    Settings,
    Settings2,
    Share,
    SquareTerminal,
    SquareUser,
    Triangle,
    Turtle,
    Sparkles,
    NotebookTabs,
    List,
  } from "lucide-react"
  
  import { Badge } from "@/components/ui/badge"
  import { Button } from "@/components/ui/button"
  import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Textarea } from "@/components/ui/textarea"
  import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
  } from "@/components/ui/tooltip"

  import { AspectRatio } 
  from "@/components/ui/aspect-ratio"

  import LeftNav from "@/components/leftnav";
  import UpNav from "@/components/upnav";
  
  export function VideoPage() {
    return (
      <TooltipProvider>
        <div className="grid h-screen w-full pl-[53px]">
        <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
          <div className="border-b p-2">
            <Button variant="outline" size="icon" aria-label="Home">
              <Triangle className="size-5 fill-foreground" />
            </Button>
          </div>
          <LeftNav />
        </aside>
        <div className="flex flex-col">
          <header>
            <UpNav />
          </header>
            <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-2">
              <div
                className="relative hidden flex-col items-start gap-8 md:flex"
                x-chunk="dashboard-03-chunk-0"
              >
                <div className="w-full">
                  <AspectRatio ratio={16 / 9}>
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/ngmkeZlz18A?si=LQ1dJRcOxQpiiOS5"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin"
                      allowfullscreen
                      className="rounded-[10px]"
                    ></iframe>
                  </AspectRatio>
                </div>

                <div className="grid w-full gap-2">
                  <Textarea placeholder="Type your message here." />
                  <Button>
                    Summarize
                    <Sparkles className="size-4" />
                  </Button>
                </div>
              </div>
              <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-1">
                <Badge variant="outline" className="absolute right-3 top-3">
                  Output
                </Badge>
                <div className="flex-1" />
                <form
                  className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
                  x-chunk="dashboard-03-chunk-1"
                >
                  <Label htmlFor="message" className="sr-only">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                  />
                  <div className="flex items-center p-3 pt-0">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <NotebookTabs className="size-4" />
                          <span className="sr-only">Add to Notes</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">Add to Notes</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <List className="size-4" />
                          <span className="sr-only">Get key points</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">Get key points</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Mic className="size-4" />
                          <span className="sr-only">Use Microphone</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">Use Microphone</TooltipContent>
                    </Tooltip>
                    <Button type="submit" size="sm" className="ml-auto gap-1.5">
                      Send Message
                      <CornerDownLeft className="size-3.5" />
                    </Button>
                  </div>
                </form>
              </div>
            </main>
          </div>
        </div>
      </TooltipProvider>
    );
  }
  
  export default VideoPage