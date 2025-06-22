import { Row, Col, Form, Input, Radio } from "antd";
import { Controller, Control } from "react-hook-form";
import type { User } from "../../types";

// 1. 定義 Props，讓元件可以接收來自 useForm 的 control 物件
interface EnterpriseFormFieldsProps {
    control: Control<User>;
}

function EnterpriseFormFields({ control }: EnterpriseFormFieldsProps) {
    return (
        <>
            <Row gutter={16}>
                <Col span={12}>

                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: "客戶名稱不能為空" }}
                        render={({ field, fieldState: { error } }) => (
                            <Form.Item
                                label="客戶名稱"
                                required
                                validateStatus={error ? 'error' : ''}
                                help={error?.message}
                            >
                                <Input {...field} placeholder="請輸入客戶名稱" />
                            </Form.Item>
                        )}
                    />
                </Col>
                <Col span={12}>
                    <Controller
                        name="tel"
                        control={control}
                        rules={{
                            required: "聯繫電話不能為空",
                            pattern: {
                                value: /^1[3-9]\d{9}$/,
                                message: "請輸入有效的手機號"
                            }
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <Form.Item
                                label="聯繫電話"
                                required
                                validateStatus={error ? 'error' : ''}
                                help={error?.message}
                            >
                                <Input {...field} placeholder="請輸入聯繫電話" />
                            </Form.Item>
                        )}
                    />
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Controller
                        name="status"
                        control={control}
                        rules={{ required: "經營狀態不能為空" }}
                        render={({ field, fieldState: { error } }) => (
                            <Form.Item
                                label="經營狀態"
                                required
                                validateStatus={error ? 'error' : ''}
                                help={error?.message}
                            >
                                <Radio.Group {...field}>
                                    <Radio value="1">營業中</Radio>
                                    <Radio value="2">暫停營業</Radio>
                                    <Radio value="3">已關閉</Radio>
                                </Radio.Group>
                            </Form.Item>
                        )}
                    />
                </Col>
                <Col span={12}>
                    <Controller
                        name="business"
                        control={control}
                        rules={{ required: "所屬行業不能為空" }}
                        render={({ field, fieldState: { error } }) => (
                            <Form.Item
                                label="所屬行業"
                                required
                                validateStatus={error ? 'error' : ''}
                                help={error?.message}
                            >
                                <Input {...field} placeholder="請輸入所屬行業" />
                            </Form.Item>
                        )}
                    />
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: "郵箱不能為空",
                            pattern: {
                                value: /^\S+@\S+\.\S+$/,
                                message: "請輸入有效的郵箱地址"
                            }
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <Form.Item
                                label="郵箱"
                                required
                                validateStatus={error ? 'error' : ''}
                                help={error?.message}
                            >
                                <Input {...field} placeholder="請輸入郵箱" />
                            </Form.Item>
                        )}
                    />
                </Col>
                <Col span={12}>
                    <Controller
                        name="creditCode"
                        control={control}
                        rules={{ required: "統一信用代碼不能為空" }}
                        render={({ field, fieldState: { error } }) => (
                            <Form.Item
                                label="統一信用代碼"
                                required
                                validateStatus={error ? 'error' : ''}
                                help={error?.message}
                            >
                                <Input {...field} placeholder="請輸入統一信用代碼" />
                            </Form.Item>
                        )}
                    />
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Controller
                        name="industryNum"
                        control={control}
                        rules={{ required: "工商註冊號不能為空" }}
                        render={({ field, fieldState: { error } }) => (
                            <Form.Item
                                label="工商註冊號"
                                required
                                validateStatus={error ? 'error' : ''}
                                help={error?.message}
                            >
                                <Input {...field} placeholder="請輸入工商註冊號" />
                            </Form.Item>
                        )}
                    />
                </Col>
                <Col span={12}>
                    <Controller
                        name="organizationCode"
                        control={control}
                        rules={{ required: "組織機構代碼不能為空" }}
                        render={({ field, fieldState: { error } }) => (
                            <Form.Item
                                label="組織機構代碼"
                                required
                                validateStatus={error ? 'error' : ''}
                                help={error?.message}
                            >
                                <Input {...field} placeholder="請輸入組織機構代碼" />
                            </Form.Item>
                        )}
                    />
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Controller
                        name="legalPerson"
                        control={control}
                        rules={{ required: "法人名不能為空" }}
                        render={({ field, fieldState: { error } }) => (
                            <Form.Item
                                label="法人名"
                                required
                                validateStatus={error ? 'error' : ''}
                                help={error?.message}
                            >
                                <Input {...field} placeholder="請輸入法人名" />
                            </Form.Item>
                        )}
                    />
                </Col>
            </Row>
        </>
    );
}

export default EnterpriseFormFields;