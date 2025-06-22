import { Modal, Form, message } from "antd";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
    const { open, onCancel, onSuccess, isEditing, initialData } = props;

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<User>({
        defaultValues: initialData || {
            name: '', tel: '', status: '1', business: '',
            email: '', creditCode: '', industryNum: '',
            organizationCode: '', legalPerson: ''
        },
    });

    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

    const onSubmit = async (data: User) => {
        try {
            const payload = isEditing ? { ...initialData, ...data } : data;
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
            reset(initialData);
        }
    }, [open, initialData, reset]);

    return (
        <>
            <Modal
                title={isEditing ? "編輯企業" : "新增企業"}
                open={open}
                onCancel={onCancel}
                width={800}
                onOk={handleSubmit(onSubmit)}
                confirmLoading={isUpdating}
                destroyOnClose
            >

                <Form layout="vertical">
                    <EnterpriseFormFields control={control} />
                </Form>
            </Modal>
        </>
    );
}

export default EnterpriseForm;