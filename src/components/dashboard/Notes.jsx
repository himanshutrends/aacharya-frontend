import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import Markdown from 'markdown-to-jsx';

const Notes = React.memo(({ focusedNote, title }) => {
  console.log("Notes rendered");
  return (
    <Card className="w-full h-[60%] lg:col-span-3">
      <CardHeader>
        <CardTitle>Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[35vh]">
          <Markdown
            children={focusedNote}
          />  
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Badge variant="outline">
          {"By" + " " + title || "Anonymous"}
        </Badge>
      </CardFooter>
    </Card>
  );
});

Notes.displayName = "Notes";
export default Notes;
