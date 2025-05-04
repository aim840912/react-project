import React from 'react';
import { ButtonProps } from 'antd';

/**
 * 高階組件 (HOC)：根據權限條件渲染組件
 *
 * @param requiredPermissions - 組件需要的權限列表
 * @param userPermissions - 用戶擁有的權限列表
 * @returns 一個包裝後的組件，根據權限決定是否渲染原始組件
 */
function withPermissions<P extends object>(
	requiredPermissions: string[],
	userPermissions: string[]
) {
	// 檢查用戶是否擁有所需的所有權限
	const hasPermission = requiredPermissions.every(
		permission => userPermissions.includes(permission)
	);

	// 返回HOC函數
	return function (Component: React.ComponentType<P>): React.FC<P> {
		// 創建有權限控制的組件
		const WrappedComponent: React.FC<P> = (props) => {
			if (!hasPermission) {
				return null;
			}
			return <Component {...props} />;
		};

		// 設置顯示名稱以便於調試
		const componentName = Component.displayName || Component.name || 'Component';
		WrappedComponent.displayName = `withPermissions(${componentName})`;

		return WrappedComponent;
	};
}

export default withPermissions;