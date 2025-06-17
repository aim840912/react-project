import { Card, Table, Row, Col, Input, Button, Pagination, Tag } from "antd"
import useDataList from "../../../hooks/useDataList";
import { getEquipmentList } from "../../../api/equipment";
import { SearchType, EquipmentDataType } from "./../types";
import { equipmentColumns } from "../equipment.config";

function Equipment() {
    const {
        dataList,
        loading,
        formData,
        handleFormChange,
        handleSearch,
        reset,
        refresh,
        paginationProps
    } = useDataList<SearchType, EquipmentDataType>({ name: "", person: "" }, getEquipmentList)

    return <div>
        <Card className="search">
            <Row gutter={16}>
                <Col span={7}>
                    <p>設備名稱：</p>
                    <Input value={formData.name} name="name" placeholder="請輸入設備名稱或編號" onChange={handleFormChange} />
                </Col>
                <Col span={7}>
                    <p>負責人：</p>
                    <Input value={formData.person} name="person" placeholder="請輸入負責人姓名" onChange={handleFormChange} />
                </Col>
                <Col span={3}>
                    <Button type="primary" className="mr" onClick={handleSearch}>查詢</Button>
                    <Button onClick={reset}>重置</Button>
                </Col>
            </Row>
        </Card>
        <Card className="mt">
            <Table
                columns={equipmentColumns}
                dataSource={dataList}
                loading={loading}
                rowKey={(record) => record.id}
                pagination={false}
            />
            <Pagination className="fr mt" showQuickJumper  {...paginationProps} />
        </Card>
    </div>
}

export default Equipment
