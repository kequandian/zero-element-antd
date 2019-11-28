import React, { useState, useEffect } from 'react';
import { Select, Spin } from 'antd';
import { query } from '@/utils/request';
import { formatAPI } from 'zero-element/lib/utils/format';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { Flex } from 'layout-flex';

const Option = Select.Option;

export default function PCD(props) {
  const {
    className,
    value,
    options,
    namespace,
    onChange,
    handle,
    ...rest
  } = props;
  const {
    API = '/api/pcd/list', dataField = 'data',
    label: optLabel = 'name', value: optValue = 'id',
    map = {
      p: 'province',
      c: 'city',
      d: 'district',
    },
  } = options;
  const { onSaveOtherValue, onGetFormData } = handle;

  const [loading, setLoading] = useState(false);
  const [provinceList, setProvinceList] = useState([]);
  const [province, setProvince] = useState({ key: -1, label: '' });
  const [cityList, setCityList] = useState([]);
  const [city, setCity] = useState({ key: -1, label: '' });
  const [districtList, setDistrictList] = useState([]);
  const [district, setDistrict] = useState({ key: -1, label: '' });

  const formData = onGetFormData();

  useDidMount(queryProvinceData);

  useEffect(_ => {
    // TODO init defaultValue
  }, [formData]);

  useEffect(_ => {
    if (province.key) {
      queryCityData(province.key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [province]);
  useEffect(_ => {
    if (city.key) {
      queryDistrictData(city.key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  function getData(queryData) {
    if (API) {
      const fAPI = formatAPI(API, {
        namespace,
      });
      setLoading(true);
      return query(fAPI, queryData)
        .then(data => {
          const list = Array.isArray(data) ?
            data
            : data[dataField];

          if (Array.isArray(list)) {
            return Promise.resolve(list);
          } else {
            console.warn(`API ${fAPI} 返回的 data 预期应该为 Array, 实际: `, list);
            return Promise.reject();
          }
        })
        .finally(_ => {
          setLoading(false);
        })
    }
    return Promise.resolve([]);
  }
  function queryProvinceData() {
    getData({})
      .then(data => {
        setProvinceList(data);
      })
  }
  function queryCityData(p) {
    getData({
      type: 'c',
      pid: p,
    })
      .then(data => {
        setCityList(data);
      })
  }
  function queryDistrictData(p) {
    getData({
      type: 'd',
      pid: p,
    })
      .then(data => {
        setDistrictList(data);
      })
  }

  function handlePChange(item) {
    setProvince(item);
    onSaveOtherValue(map.p, item.label);
  }
  function handleCChange(item) {
    setCity(item);
    onSaveOtherValue(map.c, item.label);
  }
  function handleDChange(item) {
    setDistrict(item);
    onSaveOtherValue(map.d, item.label);
  }

  return <Spin className={className} spinning={loading}>
    <Flex>
      <Select
        labelInValue
        onChange={handlePChange} value={province} {...rest}
      >
        {provinceList.map(opt => (
          <Option key={opt[optValue]} value={opt[optValue]}>
            {opt[optLabel]}
          </Option>
        ))}
      </Select>
      <Select
        labelInValue
        onChange={handleCChange} value={city} {...rest}
      >
        {cityList.map(opt => (
          <Option key={opt[optValue]} value={opt[optValue]}>
            {opt[optLabel]}
          </Option>
        ))}
      </Select>
      <Select
        labelInValue
        onChange={handleDChange} value={district} {...rest}
      >
        {districtList.map(opt => (
          <Option key={opt[optValue]} value={opt[optValue]}>
            {opt[optLabel]}
          </Option>
        ))}
      </Select>
    </Flex>
  </Spin>
}