export default function capitalizeAndLengthValidation(text: string, fieldType: string): string {
    if (fieldType !== 'shortMessage' && fieldType !== 'feedback') {
        if (fieldType === 'name') { // capitalize first letter of each word for name fields
            const words = text.split(' ');

            const textTransformed = words.map(word => (
                word.charAt(0).toUpperCase() + word.slice(1)
            ))

            return textTransformed.join(' ').slice(0, 45);
        }

        else if (fieldType === 'email') { // no need to capitalize email so only return sliced version
            return text.slice(0, 45);
        }

        else { // capitalize first letter of only first word for all except name and contact
            return text.charAt(0).toUpperCase() + text.slice(1, 45);
        }
    }

    else if (fieldType === 'shortMessage') { // capitalize first letter of first word for messages
        return text.charAt(0).toUpperCase() + text.slice(1, 500);
    }

    else { // capitalize first letter of first word for feedbacks
        return text.charAt(0).toUpperCase() + text.slice(1, 1000);
    }
}