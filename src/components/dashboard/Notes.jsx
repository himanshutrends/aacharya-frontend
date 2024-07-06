import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const Notes = React.memo(({ focusedNote, title }) => {
  return (
    <Card className="w-full h-[60%] lg:col-span-3">
      <CardHeader>
        <CardTitle>Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[35vh]">
          <div dangerouslySetInnerHTML={focusedNote}></div>
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

export default Notes;
