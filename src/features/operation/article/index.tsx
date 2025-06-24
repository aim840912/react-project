import type { FormProps } from 'antd';
import { Button, Form, Input, Card, DatePicker, Radio } from 'antd';
import { ArticleFieldType } from '../types';

const onFinish: FormProps<ArticleFieldType>['onFinish'] = (values) => { };

const onFinishFailed: FormProps<ArticleFieldType>['onFinishFailed'] = (errorInfo) => { };

function Article() {
    return <div>
        <Card>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<ArticleFieldType>
                    label="文章標題"
                    name="subtitle"
                    rules={[{ required: true, message: 'Please input your subtitle!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<ArticleFieldType>
                    label="副標題"
                    name="articleTitle"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<ArticleFieldType>
                    label="發佈時間"
                    name="time"
                    rules={[{ required: true, message: 'Please input your time!' }]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item<ArticleFieldType>
                    label="可見範圍"
                    name="allowChoose"
                    rules={[{ required: true, message: 'Please input your allowChoose"!' }]}
                >
                    <Radio.Group >
                        <Radio value={1}>所有</Radio>
                        <Radio value={2}>物業</Radio>
                        <Radio value={3}>公司</Radio>

                    </Radio.Group>
                </Form.Item>
                <Form.Item<ArticleFieldType>
                    label="文章內容"
                    name="content"
                    rules={[{ required: true, message: 'Please input your content!' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    </div>
}

export default Article
