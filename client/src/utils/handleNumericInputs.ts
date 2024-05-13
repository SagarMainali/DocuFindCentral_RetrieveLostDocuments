import { FormEvent } from "react";

export default function handleNumericInputs(event: FormEvent<HTMLInputElement>): string {
    const inputValue = (event.target as HTMLInputElement).value;
    const filteredInput = inputValue.replace(/[^0-9]/g, '');
    const slicedInput = filteredInput.slice(0, 10);
    return slicedInput;
}