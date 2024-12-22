import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Student } from '../types/student';
import { BookOpen, Calculator } from 'lucide-react';

interface StudentTableProps {
  students: Student[];
}

export function StudentTable({ students }: StudentTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student Name</TableHead>
          <TableHead>Cohort</TableHead>
          <TableHead>Courses</TableHead>
          <TableHead>Date Joined</TableHead>
          <TableHead>Last Login</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id}>
            <TableCell className="font-medium">{student.name}</TableCell>
            <TableCell>{student.cohort}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>CBSE 9 Science</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calculator className="h-4 w-4" />
                  <span>CBSE 9 Math</span>
                </div>
              </div>
            </TableCell>
            <TableCell>{student.dateJoined}</TableCell>
            <TableCell>{student.lastLogin}</TableCell>
            <TableCell>
              <Badge variant={student.status === 'active' ? 'success' : 'destructive'}>
                {student.status === 'active' ? '●' : '○'}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}