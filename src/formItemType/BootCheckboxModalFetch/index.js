import React, { useState, useEffect, useRef } from 'react';
import {
    Spinner, CheckboxGroup, Checkbox, Stack, Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    SimpleGrid
} from "@chakra-ui/react";
import { useForceUpdate } from '@/components/hooks/lifeCycle';
const promiseAjax = require('@/components/utils/request');

export default function CheckboxFetch(props) {

    const { field, defaultValue, options, saveData, onChange, props: optProps, rules } = props;
    const { api: optionAPI, label, value, itemField, modalTitle: mTitle } = options;

    const [selectedData, setSelectedData] = useState([])
    const [ listData, setListData ] = useState([])
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [modelTitle, setModelTitle] = useState(mTitle);
    const [btnTxt, setBtnTxt] = useState(mTitle);
    const [showDefaultValue, setShowDefaultValue] = useState([])

    const forceUpdate = useForceUpdate()

    const initialRef = useRef()
    const finalRef = useRef()

    useEffect(_ => {
        getList()
    }, [])

    useEffect(_ => {
        if(Array.isArray(defaultValue) && defaultValue.length > 0){
            const defaultSelected = []
            defaultValue.map(item => {
                let defaultSelectedItem = itemField ? item[itemField].toString() : item;
                defaultSelected.push(defaultSelectedItem)
            })
            handleBtnTxt(defaultSelected)
            setSelectedData(defaultSelected)
        }
    }, [defaultValue])

    //获取复选框数据
    function getList() {

        const api = `${optionAPI}`;
        const queryData = {};
        setLoading(true)
        promiseAjax(api, queryData).then(resp => {
            if (resp && resp.code === 200) {
                setListData(resp.data.records)
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

    const handleChange = (data) => {
        const items = []
        if (Array.isArray(data) && data.length > 0) {
            data.map(item => {
                if (itemField) {
                    const i = {}
                    i[itemField] = item
                    items.push(i)
                } else {
                    items.push(item)
                }
            })
            setSelectedData(items)
        }
    }

    const onOk = () => {
        const subData = {}
        subData[field] = selectedData
        handleBtnTxt(selectedData)
        onChange({...subData})
        setIsOpen(false)
    }

    const onClose = () => {
        setIsOpen(false)
    }

    const handleBtnTxt = () => {
        if(Array.isArray(selectedData) && selectedData.length > 0){
            let txt = ''
            selectedData.map(item => {
                if (itemField) {
                    const i = {}
                    txt += item[itemField]
                } else {
                    txt += item
                }
            })
            setBtnTxt(txt)
        }
    }

    //处理回显数据
    const showSelectedData = (dataList) => {
        const showList = []
        dataList.map(item => {
            const i = itemField ? item[itemField] : item
            showList.push(i)
        })
        return showList
    }

    return (
        <>
            <Button colorScheme='teal' variant='outline' size='sm' onClick={() => setIsOpen(true)}>
                {btnTxt}
            </Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{modelTitle}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {loading ? (
                            <Spinner />
                        ) : (
                            <Stack spacing="6">

                                <CheckboxGroup colorScheme='gray.50' 
                                    defaultValue={selectedData ? showSelectedData(selectedData) : []}
                                    onChange={handleChange}>
                                    <SimpleGrid columns={3} spacingX='20px' spacingY='20px'>
                                        { listData && listData.length > 0 && listData.map((item, index) => (
                                            <Checkbox value={item[value]} key={`${index}_checkbox`}>{item[label]}</Checkbox>
                                        ))}
                                    </SimpleGrid>
                                </CheckboxGroup>

                                <Stack direction='row' spacing={4} align='center'>
                                    <Button width='100px' colorScheme='teal' variant='solid' isLoading={loading} size='sm' onClick={onOk}>
                                        保存
                                    </Button>
                                    <Button width='100px' colorScheme='teal' variant='outline' onClick={onClose} size='sm'>取消</Button>
                                </Stack>
                            </Stack>
                        )}

                    </ModalBody>

                    {/* <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onOk}>
                        Save
                        </Button>
                    </ModalFooter> */}
                </ModalContent>
            </Modal>

        </>
    )


}