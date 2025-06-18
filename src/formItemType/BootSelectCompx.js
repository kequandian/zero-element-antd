import React, { useState, useEffect } from 'react';
import { Spinner, Select } from "@chakra-ui/react";
import { useForceUpdate } from '@/components/hooks/lifeCycle';

export default function SelectFetch(props) {

    const { field, register, currentData, defaultValue, options, saveData, onChange, props: optProps, rules } = props;
    const { label, value, option:mapList } = options;


    const [data, setData] = useState(mapList)
    const [loading, setLoading] = useState(false)
    const [selectedValue, setSelectedValue] = useState('')

    const forceUpdate =  useForceUpdate()


    //处理额外提交的字段和值
    function selectedChange(s) {
        const id = s.target.value
        let currentSelected;
        setSelectedValue(id)
        data.map(item => {
            if (item.id === id) {
                currentSelected = item
            }
        })
        if (onChange) {
            if (saveData) {
                const formatData = {}
                Object.keys(saveData).map(key => {
                    formatData[key] = currentSelected[saveData[key]]
                })
                // console.log(' formatData == ', formatData)
                onChange(formatData)
            }
        }
    }

    return (
        <>
            {loading ? <Spinner /> : (
                <Select bgColor="gray.50" placeholder={optProps.placeholder ? optProps.placeholder : `请选择`} id={field}
                    value={selectedValue || defaultValue}
                    {...register(field,
                        rules && rules.isRequired && optProps ? {
                            required: optProps.placeholder ? optProps.placeholder : `请选择`
                        } : {}
                    )}
                    // autoFocus
                    onChange={selectedChange}
                >
                    {data && data.length > 0 && data.map((item, index) => (
                        <option key={`${index}_option`} value={item.value}>{item.label}</option>
                    ))}
                </Select>
            )}
        </>
    )


}