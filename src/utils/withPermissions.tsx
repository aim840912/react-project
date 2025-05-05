import React from 'react';
import { useSelector } from 'react-redux';
import { selectHasAllPermissions, RootState } from '../store/permissionSlice';

/**
 * @param requiredPermissions - 組件需要的權限列表
 * @param userPermissionsList - 可選，用戶擁有的權限列表，如果不提供則從Redux獲取
 * @returns 一個包裝後的組件，根據權限決定是否渲染原始組件
 */
function withPermissions<P extends object>(
	requiredPermissions: string[],
	userPermissionsList?: string[]
) {

	return function (Component: React.ComponentType<P>): React.FC<P> {

		const WrappedComponent: React.FC<P> = (props) => {

			let hasPermission: boolean;

			if (userPermissionsList) {
				hasPermission = requiredPermissions.every(permission => userPermissionsList.includes(permission));
			} else {
				hasPermission = useSelector((state: RootState) => selectHasAllPermissions(state, requiredPermissions));
			}

			if (!hasPermission) {
				return <div>無訪問權限</div>;
			}

			return <Component {...props} />;
		};

		const componentName = Component.displayName || Component.name || 'Component';
		WrappedComponent.displayName = `withPermissions(${componentName})`;

		return WrappedComponent;
	};
}

export default withPermissions;