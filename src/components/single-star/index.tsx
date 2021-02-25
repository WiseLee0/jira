import { Rate } from "antd"
interface SingleStarProps extends React.ComponentProps<typeof Rate> {
    checked: boolean;
    onCheckedChange?: (checked: boolean) => void;
}
export const SingleStar = ({ checked, onCheckedChange, ...restProps }: SingleStarProps) => {
    return <Rate
        count={1}
        value={checked ? 1 : 0}
        onChange={(num) => onCheckedChange?.(!!num)}
        {...restProps}
    />
}