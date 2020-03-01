import React from 'react';

class TableFooter extends React.Component {
  render() {
    const { dataSource, columns } = this.props;
    return (
      <table className="ant-table">
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
    )
  }
}
export default TableFooter;