import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/global-components/ui/table'
import React from 'react'
import { format } from "date-fns";

type Props = { donation: any[] }

const DonersTable = ({ donation }: Props) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nickname</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Time</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {donation?.filter(d => d.state === "VALID").length === 0 && (
                    <TableRow>
                        <TableCell colSpan={3} className="text-center text-gray-500">
                            No valid donations yet.
                        </TableCell>
                    </TableRow>
                )}
                {donation?.filter(d => d.state === "VALID").map((donation, idx) => (
                    <TableRow key={idx}>
                        <TableCell>{donation.nickname}</TableCell>
                        <TableCell>${donation.amountUsd.toFixed(2)}</TableCell>
                        <TableCell>{format(new Date(donation.createdAt), "yyyy-MM-dd")}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default DonersTable