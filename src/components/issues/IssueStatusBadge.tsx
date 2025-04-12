
import { Badge } from '@/components/ui/badge';
import { StatusType } from '@/types';
import { statusInfo } from '@/utils/mockData';

interface IssueStatusBadgeProps {
  status: StatusType;
  className?: string;
}

const IssueStatusBadge = ({ status, className = '' }: IssueStatusBadgeProps) => {
  const { label, color } = statusInfo[status];
  
  return (
    <Badge className={`${color} ${className}`}>
      {label}
    </Badge>
  );
};

export default IssueStatusBadge;
