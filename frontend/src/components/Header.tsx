import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Plus } from 'lucide-react';

export function Header() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <Select defaultValue="AY 2024-25">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AY 2024-25">AY 2024-25</SelectItem>
            <SelectItem value="AY 2023-24">AY 2023-24</SelectItem>
          </SelectContent>
        </Select>
        
        <Select defaultValue="CBSE 9">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CBSE 9">CBSE 9</SelectItem>
            <SelectItem value="CBSE 10">CBSE 10</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search your course"
            className="pl-8"
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add new Student
        </Button>
      </div>
    </div>
  );
}