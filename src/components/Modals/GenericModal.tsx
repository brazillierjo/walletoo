import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import { Button } from "@/src/components/ui/button";

type GenericModalProps = {
    isOpen: boolean;
    handleClose: () => void;
    title: string;
    children: ReactNode;
    closeButtonText?: string;
};

export const GenericModal: React.FC<GenericModalProps> = ({
    isOpen,
    handleClose,
    title,
    children,
    closeButtonText,
}) => {
    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog
                as='div'
                className='fixed inset-0 z-10 overflow-y-auto'
                onClose={handleClose}>
                <div className='min-h-screen px-4 text-center'>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'>
                        <Dialog.Overlay className='fixed inset-0 bg-black opacity-30' />
                    </Transition.Child>

                    <span
                        className='inline-block h-screen align-middle'
                        aria-hidden='true'>
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 scale-95'
                        enterTo='opacity-100 scale-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 scale-100'
                        leaveTo='opacity-0 scale-95'>
                        <div className='my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                            <Dialog.Title
                                as='h3'
                                className='text-lg font-medium leading-6 text-gray-900'>
                                {title}
                            </Dialog.Title>

                            <Dialog.Description className='mt-2 text-sm text-gray-500'>
                                {children}
                            </Dialog.Description>

                            <div className='mt-4 flex justify-end'>
                                <Button type='button' onClick={handleClose}>
                                    {closeButtonText ?? "Fermer"}
                                </Button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};
