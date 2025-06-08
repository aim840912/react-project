import { Card, Button, Descriptions } from "antd"
import { useNavigate, useSearchParams } from "react-router"
import type { DescriptionsProps } from "antd";

const items: DescriptionsProps['items'] = [
    {
        key: '1',
        label: '合同類別',
        children: '租賃合同',
    },
    {
        key: '2',
        label: '合同名稱',
        children: '房屋租賃合同通用模版',
    },
    {
        key: '3',
        label: '合同開始日期',
        children: '2023-03-05',
    },
    {
        key: '4',
        label: '合同結束日期',
        children: '2024-03-05',
    },
    {
        key: '5',
        label: '甲方',
        children: '萬物科技有限公司',
    },
    {
        key: '6',
        label: '乙方',
        children: "天明物業有限公司",
        span: 3,
    },
    {
        key: '7',
        label: '審批狀態',
        children: '審批拒絕',
    },
    {
        key: '8',
        label: '拒絕原因',
        children: '缺少法人蓋章',
    },
    {
        key: '9',
        label: '聯繫方式',
        children: '18888888888',
    },
    {
        key: '10',
        label: '附加條款',
        children: (
            <>
                1. 半年付，年租
                <br />
                2. 費用已包含空調費用
                <br />
                3. 含兩個車位使用權(不含充電樁)
                <br />
                4. 9:00-18:00禁止裝修

            </>
        ),
    },
];

const items2: DescriptionsProps['items'] = [
    {
        key: '1',
        label: '所有樓宇',
        children: 'A1幢寫字樓',
    },
    {
        key: '2',
        label: '房間號',
        children: '406',
    },
    {
        key: '3',
        label: '房屋面積',
        children: '96㎡',
    },
    {
        key: '4',
        label: '計價面積',
        children: '70㎡',
    },
    {
        key: '5',
        label: '物業費',
        children: '6800',
    },
    {
        key: '6',
        label: '房屋狀態',
        children: "精裝",
    },
    {
        key: '7',
        label: '物業管家',
        children: '蔡文萍',
    },
    {
        key: '8',
        label: '管家電話',
        children: '17777777777',
    },
];
function Surrender() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    return <div>
        <Card>
            <Button type="primary" onClick={() => navigate("/finance/contract?return=true")}>返回</Button>
        </Card>
        <Card className="mt">
            <Descriptions title={`合同編號：${searchParams.get("contractNo")}`} bordered items={items} />
            <Descriptions title="租賃房間信息" bordered items={items2} className="mt" />
        </Card>
    </div>
}

export default Surrender