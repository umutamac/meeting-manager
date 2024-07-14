export module CONTACT {
    export function createContactsArray(
        id: string[],
        name: string[],
        surname: string[],
        email: string[],
        phone: any[],
    ) {
        if (
            email.length === id.length &&
            id.length === name.length &&
            name.length === phone.length &&
            phone.length === surname.length
        ) {
            return email.map((_, index) => ({
                email: email[index],
                id: id[index],
                name: name[index],
                phone: phone[index],
                surname: surname[index]
            }));
        } else {
            throw new Error('All input arrays must have the same length.');
        }
    }
}