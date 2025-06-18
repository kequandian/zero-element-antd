import React, { useState, useEffect, useRef } from 'react';

import {
    VStack, Spinner, CheckboxGroup, Checkbox, Stack, Button,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
    SimpleGrid,
    Box,
    Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer,
    FormControl, // 未表单元素添加动态效果 如校验 禁用等
    FormLabel, // label
    FormErrorMessage,
    useToast,
} from "@chakra-ui/react";
import { useForceUpdate } from '@/components/hooks/lifeCycle';
import { useForm } from 'react-hook-form';
const promiseAjax = require('@/components/utils/request');
const FormItemTypeMap = require('@/components/config/FormItemTypeConfig').get();


export default function OneMany(props) {


    const { field, defaultValue, props: optProps, onChange } = props;

    const { actions=[], fields=[], operation=[] } = optProps
    
    const [currentId, setCurrentId] = useState('')
    const [currentData, setCurrentData] = useState({})
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true)
    const [modelTitle, setModelTitle] = useState('标题');
    const [formData, setFormData] = useState({})
    const [ localListData, setLocalListData ] = useState([])

    const forceUpdate = useForceUpdate()

    const initialRef = useRef()
    const finalRef = useRef()
    const toast = useToast()

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting },
      } = useForm()

    function validateData(values) {
        localListData.push(values)
        setLocalListData(localListData)
        console.log('localListData === ', localListData)
        setIsOpen(false)
        // onChange(localListData)
    }

    //处理额外提交的字段和值
    function handleFormData(data) {
        const newFormData = {
        ...formData,
        ...data
        }
        // console.log('newFormData === ', JSON.stringify(newFormData))
        setFormData(newFormData)
    }

    //根据type 加载表单组件
    function handleFormItem(list) {
        const fieldList = list;

        return fieldList.map((item, index) => {

        const { label, field, type, rules = { isRequired: false }, defaultValue } = item;

        const C = FormItemTypeMap[type]

        return <FormControl isRequired={rules.isRequired} isInvalid={rules.isRequired && errors[field]} key={`${index}_i`}>
            <FormLabel htmlFor={field}>{label}</FormLabel>
            <C {...item} register={register} errors={errors} currentData={currentData} defaultValue={currentData[field] || defaultValue} onChange={handleFormData} />
            <FormErrorMessage>
            {errors[field] && errors[field].message}
            </FormErrorMessage>
        </FormControl>
        })
    }

    //新增数据
    const postData = () => {

    }

    //编辑
    const putData = () => {

    }

    //关闭模态框
    const onClose = () => {
        setIsOpen(false)
    }

    // tips
    function toastTips(text, status = 'success') {
        toast({
            title: text,
            description: "",
            status: status,
            duration: 3000,
            isClosable: true,
            position: 'top'
        })
    }

    return (
        <VStack alignItems={'left'} marginBottom={'10px'}>
            <Box>
                <Button colorScheme='teal' variant='outline' size='sm' onClick={() => setIsOpen(true)}>
                    添加
                </Button>
            </Box>

            <Box>
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                { fields && fields.map((item, index) => (
                                    <Th key={`${index}_th`}>{item.label}</Th>
                                ))}
                                <Th>操作</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                                { 
                                    localListData && localListData.map((item, index) => (
                                        <Tr key={`${index}_tr`}>
                                        {
                                            fields && fields.map((fieldItem, fieldIndex) => (
                                                <Td key={`${fieldIndex}_td`}> 
                                                 {
                                                    item[fieldItem.field]
                                                 }
                                                </Td>
                                            ))
                                        }
                                        <Td>编辑 删除</Td>
                                        </Tr>
                                    ))
                                }
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{modelTitle}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <form onSubmit={handleSubmit(validateData)} noValidate>
              
                            <Stack spacing="6">
                                {
                                    handleFormItem(actions[0].options.items)
                                }
                                <Stack direction='row' spacing={4} align='center'>
                                    
                                    <Button width='100px' colorScheme='teal' variant='solid' type='submit' size='sm'>
                                    保存
                                    </Button>
                                    <Button width='100px' colorScheme='teal' variant='outline' onClick={onClose} size='sm'>取消</Button>
                                </Stack>
                            </Stack>
                        </form>
                    </ModalBody>

                </ModalContent>
            </Modal>

        </VStack>
    )

}