import { useState } from "react"
import { Dialog } from "@headlessui/react"

type ModalProps = {
  title: string
  description: string
  children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ title, description, children }) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <Dialog.Panel>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>{description}</Dialog.Description>

        {children}
      </Dialog.Panel>
    </Dialog>
  )
}
