import { Loader2 } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="container mx-auto max-w-[1200px] flex flex-col items-center justify-center py-32 px-4 text-center min-h-[calc(100vh-200px)]">
      <Loader2 className="h-24 w-24 animate-spin text-yellow-500" />
      <p className="mt-4 text-xl text-muted-foreground">Đang tải trang...</p>
    </div>
  );
}
