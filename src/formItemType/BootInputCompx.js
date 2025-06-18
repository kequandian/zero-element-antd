import React from 'react';

import {
    Input, // 文本框
} from "@chakra-ui/react";

export default function InputCompx(props) {

    const { field, register, defaultValue, props: optProps, rules } = props;

    return <Input bgColor="gray.50" placeholder={optProps.placeholder ? optProps.placeholder : `请输入`} id={field} defaultValue={defaultValue} isReadOnly={optProps.isReadOnly ? optProps.isReadOnly : false}
        {...register(field,
            rules && rules.isRequired && optProps ? {
                required: optProps.placeholder ? optProps.placeholder : `请输入`
            } : {}
        )}
    />

}