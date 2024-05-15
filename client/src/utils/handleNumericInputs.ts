export default function handleNumericInputs(value: string, limit: number): string {
    const filteredInput = value.replace(/[^0-9]/g, ''); // filter out everything except numbers
    const slicedInput = filteredInput.slice(0, limit); // slice down the filtered to its limit
    return slicedInput;
}