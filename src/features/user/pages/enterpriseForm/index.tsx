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
                // 如果是編輯，可以將 id 加入到請求中
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
        if (!open) {
            form.resetFields(); // 彈窗關閉時重設表單
        }
    }, [open, form]);

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
