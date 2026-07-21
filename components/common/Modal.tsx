'use client'
import { ConfigProvider, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { ReactNode } from "react";

type GenericModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
};

export default function GenericModal({ isOpen, onClose, title, children }: GenericModalProps) {
    const { t } = useTranslation();

    return (
        <ConfigProvider
            theme={{
                components: {
                    Modal: {
                        contentBg: 'var(--color-base-100)', // Màu nền nội dung Modal
                    },
                },
            }}
        >
            <Modal
                open={isOpen}
                onCancel={onClose}
                footer={null}
                width={896}
                closeIcon={
                    <div className="p-1 font-bold text-3xl text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </div>
                }

            >
                <div className="h-140">
                    <h3 className="font-bold text-2xl text-base-content">{t(title)}</h3>
                    <div className="modal-action justify-center">
                        {children}
                    </div>
                </div>
            </Modal>
        </ConfigProvider>
    );
}