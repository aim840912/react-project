import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import useDebounce from './useDebounce';

vi.useFakeTimers();

describe('useDebounce Hook', () => {

    test('應回傳初始值', () => {
        const { result } = renderHook(() => useDebounce('initial', 500));
        expect(result.current).toBe('initial');
    });

    test('在延遲時間內不應更新值', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: 'first', delay: 500 } }
        );

        expect(result.current).toBe('first');

        rerender({ value: 'second', delay: 500 });

        expect(result.current).toBe('first');

        act(() => {
            vi.advanceTimersByTime(499);
        });

        expect(result.current).toBe('first');
    });

    test('在延遲時間後應更新為最新的值', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: 'first', delay: 500 } }
        );

        rerender({ value: 'second', delay: 500 });
        act(() => {
            vi.advanceTimersByTime(500);
        });

        expect(result.current).toBe('second');
    });

    test('如果在延遲時間內值被再次更新，應重新計算延遲', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: 'first', delay: 500 } }
        );

        rerender({ value: 'second', delay: 500 });

        act(() => { vi.advanceTimersByTime(300); });

        rerender({ value: 'third', delay: 500 });

        act(() => { vi.advanceTimersByTime(300); });

        expect(result.current).toBe('first');

        act(() => { vi.advanceTimersByTime(200); });

        expect(result.current).toBe('third');
    });
});