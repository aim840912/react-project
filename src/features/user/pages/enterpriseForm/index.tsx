import { Modal, Form, message } from "antd"
import { useEffect } from "react";
import editUser from "../../../../api/editUser";
import { User } from "../../types";
import EnterpriseFormFields from "./enterpriseFormFields";


interface FormProps {
    open: boolean;
    onCancel: () => void;
    onSuccess: () => void;
    isEditing: boolean;
    initialData?: User;
}

function EnterpriseForm(props: FormProps) {
    const [form] = Form.useForm();
    const { open, onCancel, onSuccess, isEditing, initialData } = props;

    const handleOk = () => {
        form.validateFields().then(async (values) => {
            try {
                const payload = isEditing ? { ...initialData, ...values } : values;
                const response = await editUser(payload);
                message.success(response.data || "操作成功");
                onSuccess();
                onCancel();
            } catch (err) {
                message.error("更新失敗 : " + err);
            }
        }).catch((err) => {
            console.log("表單驗證失敗:", err);
        });
    };

    useEffect(() => {
        if (open) { // 只有在 Modal 打開時才處理
            if (initialData) {
                // 如果有初始資料 (編輯模式)，則使用 setFieldsValue 來填充表單
                form.setFieldsValue(initialData);
            } else {
                // 如果沒有初始資料 (新增模式)，則清空表單
                form.resetFields();
            }
        }
    }, [open, initialData, form]);

    return <>
        <Modal
            title={isEditing ? "編輯企業" : "新增企業"}
            open={open}
            onCancel={onCancel}
            width={800}
            onOk={handleOk}
            forceRender
        >
            <Form
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={initialData}
            >
                <EnterpriseFormFields />
            </Form>
        </Modal>
    </>
}
export default EnterpriseForm
