// utils/fakeGenerators.ts
import { faker } from '@faker-js/faker';

export function generateContracts(count: number) {
    return Array.from({ length: count }, (_, i) => ({
        id: `contract-${i + 1}`,
        name: faker.company.name(),
        amount: faker.number.int({ min: 1000, max: 10000 }),
        startDate: faker.date.past({ years: 1 }).toISOString().split('T')[0],
        endDate: faker.date.future({ years: 1 }).toISOString().split('T')[0],
        status: faker.helpers.arrayElement(['有效', '已終止', '草稿']),
        contactPerson: faker.person.fullName(),
        phone: faker.phone.number(),
    }));
}

export function generateUsers(count: number) {
    return Array.from({ length: count }, (_, i) => ({
        key: `user-${i + 1}`,
        name: faker.person.fullName(),
        age: faker.number.int({ min: 18, max: 60 }),
        address: faker.location.city(),
    }));
}

export function generateEquipments(count: number) {
    return Array.from({ length: count }, (_, i) => ({
        id: `equipment-${i + 1}`,
        name: `設備${i + 1}`,
        status: faker.helpers.arrayElement(['正常', '維修中', '報廢']),
    }));
}
