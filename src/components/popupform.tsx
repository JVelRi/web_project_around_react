import type { FormEvent, ReactNode } from 'react';

type PopupFormProps = {
    submitText: string;
    onSubmit: () => void;
    children: ReactNode;
}

function PopupForm(props: PopupFormProps) {
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        props.onSubmit();
    }

    return (
        <form className="popup__form" noValidate onSubmit={handleSubmit}>{props.children}
            <button className="button popup__button" type="submit">{props.submitText}
            </button>
        </form>
    );
}

export default PopupForm;