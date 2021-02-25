import { Select } from "antd"
import React from "react"

type SelectProps = React.ComponentProps<typeof Select>

interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
    value: string | number | null | undefined
    onChange: (value?: number) => void
    options: {
        name: string
        id: number
    }[]
    defaultOptionName: string
}
const toNumber = (value?: unknown) => {
    return isNaN(Number(value)) ? 0 : Number(value)
}

export const IdSelect = (props: IdSelectProps) => {
    const { value, onChange, options, defaultOptionName, ...restProps } = props;
    return <Select
        onChange={(e) => onChange(Number(e))}
        value={options.length ? toNumber(value) : 0}
        {...restProps}
    >
        {
            defaultOptionName.length && <Select.Option value={0}>{defaultOptionName}</Select.Option>
        }
        {
            options.map(option => {
                return <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>
            })
        }
    </Select >
}