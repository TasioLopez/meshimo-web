import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function Divider({ className }: Props) {
  return <div className={cn("h-px w-full bg-taupe-line", className)} />;
}
