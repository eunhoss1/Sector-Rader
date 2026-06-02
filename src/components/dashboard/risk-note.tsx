import { AlertCircle } from "lucide-react";

type RiskNoteProps = {
  text: string;
};

export function RiskNote({ text }: RiskNoteProps) {
  return (
    <div className="flex gap-2 text-xs leading-5 text-muted-foreground">
      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" aria-hidden="true" />
      <span>{text}</span>
    </div>
  );
}
