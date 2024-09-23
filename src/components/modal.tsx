import { forwardRef, memo, ReactNode } from "react";

// Define the props interface for the Modal component
interface ModalProps {
    children?: ReactNode; // Optional children to be rendered inside the modal
}

/**
 * Modal component represents a modal dialog window.
 * 
 * @param {ModalProps} props - The component props.
 * @param {ReactNode} [props.children] - Optional children to be rendered inside the modal.
 * @param {React.Ref<HTMLDialogElement>} ref - Ref to the HTML dialog element.
 * @returns {JSX.Element} - A JSX element representing the modal dialog.
 */
const Modal = forwardRef<HTMLDialogElement, ModalProps>(({ children }, ref) => {
    return (
        <dialog id="my_modal" className="modal" ref={ref}>
            <div className="modal-box h-fit">
                {children}
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
});

export default memo(Modal);
