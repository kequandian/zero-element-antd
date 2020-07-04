import React, { useRef } from 'react';

function tableFooter(dataSource, columns) {
  const footer = useRef(null);

  if (footer.current === null) {
    footer.current = columns.some(i => i.footerSum);
  }

  if (footer.current === true) {
    return () => <TableFooter
      dataSource={dataSource}
      columns={columns}
    />
  }
  return undefined;
}

function TableFooter(props) {
  const { dataSource, columns } = props;

  return <table className="ant-table">
    <colgroup>
      {columns.map((colModel, index) => {
        return <col style={{
          width: colModel.width,
          minWidth: colModel.width
        }} key={index} />
      })}
    </colgroup>
    <tfoot >
      <tr >
        {columns.map((colum, idxCol) => {
          return <td style={{ padding: "0px 8px" }} className={colum.className} key={idxCol}>
            <strong>
              {dataSource && colum.footerSum ?
                `总${colum.title} ${dataSource.reduce((sum, record) => sum + parseFloat(record[colum.dataIndex]), 0)}`
                : ""
              }
            </strong>
          </td>
        })}
      </tr>
    </tfoot>
  </table>
}

export default tableFooter;