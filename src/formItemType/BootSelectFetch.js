import React, { useState, useEffect } from 'react';
import { Spinner, Select } from "@chakra-ui/react";
import { useForceUpdate } from '@/components/hooks/lifeCycle';
const promiseAjax = require('@/components/utils/request');
import { formatParams } from '@/components/utils/tools';

export default function SelectFetch(props) {

    const { field, register, currentData, defaultValue, options, saveData, onChange, props: optProps, rules } = props;
    const { api: optionAPI, label, value } = options;


    const [data, setData] = useState('')
    const [loading, setLoading] = useState(false)
    const [selectedValue, setSelectedValue] = useState('')

    const forceUpdate =  useForceUpdate()

    useEffect(_ => {
        getSelectList()
    }, [])

    //获取下拉框列表
    function getSelectList() {

        const api = formatParams(optionAPI, currentData);
        const queryData = {};
        setLoading(true)
        promiseAjax(api, queryData).then(resp => {
            if (resp && resp.code === 200) {
                const list = resp.data && Array.isArray(resp.data) ? resp.data : resp.data.records;
                setData(list)
                // if(onChange){
                //     onChange(resp.data.records)
                // }
            } else {
                console.error("select 获取数据失败")
            }
        }).finally(_ => {
            setLoading(false)
            forceUpdate()
        });
    }

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
                        <option key={`${index}_option`} value={item[value]}>{item[label]}</option>
                    ))}
                </Select>
            )}
        </>
    )


}