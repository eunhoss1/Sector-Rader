"use client";

import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { Sector } from "@/types/dashboard";

type SectorRankingTableProps = {
  sectors: Sector[];
  selectedSectorId: string;
  onSelectSector: (sectorId: string) => void;
};

export function SectorRankingTable({ sectors, selectedSectorId, onSelectSector }: SectorRankingTableProps) {
  return (
    <div className="rounded-lg border bg-card shadow-panel">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>섹터</TableHead>
            <TableHead className="hidden sm:table-cell">지역</TableHead>
            <TableHead className="text-right">
              <span className="inline-flex items-center justify-end gap-1">
                점수
                <ArrowUpDown className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </TableHead>
            <TableHead className="w-24 text-right">선택</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sectors.map((sector, index) => {
            const selected = sector.id === selectedSectorId;

            return (
              <TableRow key={sector.id} className={cn(selected && "bg-secondary/60 hover:bg-secondary/70")}>
                <TableCell className="font-medium text-muted-foreground">{index + 1}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-semibold">{sector.name}</p>
                    <p className="text-xs text-muted-foreground">{sector.ticker}</p>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant="outline">{sector.region}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant={sector.totalScore >= 80 ? "success" : sector.totalScore >= 70 ? "secondary" : "warning"}>
                    {sector.totalScore}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    type="button"
                    size="sm"
                    variant={selected ? "default" : "outline"}
                    onClick={() => onSelectSector(sector.id)}
                    aria-pressed={selected}
                  >
                    보기
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
