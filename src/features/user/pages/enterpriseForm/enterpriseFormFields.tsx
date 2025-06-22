import { Row, Col, Form, Input, Radio } from "antd";

function EnterpriseFormFields() {
    return (
        <>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="客戶名稱"
                        name="name"
                        rules={[{ required: true, message: "客戶名稱不能為空" }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="聯繫電話"
                        name="tel"
                        rules={[{ required: true, message: "聯繫電話不能為空" }, { pattern: /^1[3-9]\d{9}$/, message: "請輸入有效的手機號" }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="經營狀態"
                        name="status"
                        rules={[{ required: true, message: "經營狀態不能為空" }]}
                    >
                        <Radio.Group>
                            <Radio value="1">營業中</Radio>
                            <Radio value="2">暫停營業</Radio>
                            <Radio value="3">已關閉</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="所屬行業"
                        name="business"
                        rules={[{ required: true, message: "所屬行業不能為空" }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="郵箱"
                        name="email"
                        rules={[{ required: true, message: "郵箱不能為空" }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="統一信用代碼"
                        name="creditCode"
                        rules={[{ required: true, message: "統一信用代碼不能為空" }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="工商註冊號"
                        name="industryNum"
                        rules={[{ required: true, message: "工商註冊號不能為空" }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="組織機構代碼"
                        name="organizationCode"
                        rules={[{ required: true, message: "組織機構代碼不能為空" }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="法人名"
                        name="legalPerson"
                        rules={[{ required: true, message: "法人名不能為空" }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
}

export default EnterpriseFormFields;