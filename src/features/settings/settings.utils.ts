import { MenuType } from "./types";

export function extractTreeKeys(data: MenuType[]): string[] {
    let keys: string[] = [];
    data.forEach((item) => {
        if (item.children && item.children.length > 0) {
            const childKeys = extractTreeKeys(item.children);
            keys = keys.concat(childKeys);
        } else {
            keys.push(item.key);
        }
    });
    return keys;
}