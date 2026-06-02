import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExposureBadge } from "@/components/dashboard/exposure-badge";
import { RiskNote } from "@/components/dashboard/risk-note";
import type { Stock } from "@/types/dashboard";

type BeneficiaryStocksTableProps = {
  stocks: Stock[];
};

export function BeneficiaryStocksTable({ stocks }: BeneficiaryStocksTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Direct Beneficiaries</CardTitle>
        <CardDescription>섹터 내부에서 어떤 종목이 직접 수혜를 받는가?</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>종목</TableHead>
              <TableHead className="hidden lg:table-cell">직접 수혜 근거</TableHead>
              <TableHead className="hidden md:table-cell">민감도</TableHead>
              <TableHead className="hidden xl:table-cell">리스크</TableHead>
              <TableHead className="w-20 text-right">노출</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stocks.map((stock) => (
              <TableRow key={stock.id}>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold">{stock.name}</p>
                      <Badge variant="outline">{stock.market}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{stock.ticker}</p>
                    <p className="text-xs leading-5 text-muted-foreground lg:hidden">{stock.directBenefit}</p>
                  </div>
                </TableCell>
                <TableCell className="hidden max-w-md text-sm leading-6 lg:table-cell">{stock.directBenefit}</TableCell>
                <TableCell className="hidden text-sm leading-6 text-muted-foreground md:table-cell">{stock.sensitivity}</TableCell>
                <TableCell className="hidden xl:table-cell">
                  <RiskNote text={stock.risks} />
                </TableCell>
                <TableCell className="text-right">
                  <ExposureBadge score={stock.exposureScore} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
