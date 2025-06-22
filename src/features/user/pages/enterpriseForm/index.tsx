import { Modal, Form, message } from "antd";
import { useEffect } from "react";
import type { User } from "../../types";
import EnterpriseFormFields from "./enterpriseFormFields";
import { useUpdateUserMutation } from "../../api/userApi";

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

    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const payload = isEditing ? { ...initialData, ...values } : values;

            await updateUser(payload).unwrap();

            message.success("操作成功");
            onSuccess();
            onCancel();
        } catch (err) {
            console.error("操作失敗:", err);
            message.error("操作失敗，請稍後再試");
        }
    };

    useEffect(() => {
        if (open) {
            if (initialData) {
                form.setFieldsValue(initialData);
            } else {
                form.resetFields();
            }
        }
    }, [open, initialData, form]);

    return (
        <>
            <Modal
                title={isEditing ? "編輯企業" : "新增企業"}
                open={open}
                onCancel={onCancel}
                width={800}
                onOk={handleOk}
                confirmLoading={isUpdating}
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
    );
}

export default EnterpriseForm;