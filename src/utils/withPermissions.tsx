import React from 'react';
import { selectHasAllPermissions } from '../../src/features/user/permissionSlice';
import { useAppSelector } from '../app/hooks';

/**
 * @param requiredPermissions - 組件需要的權限列表

 * @returns 一個包裝後的組件，根據權限決定是否渲染原始組件
 */
function withPermissions<P extends object>(requiredPermissions: string[]) {

	return function (Component: React.ComponentType<P>): React.FC<P> {

		const WrappedComponent: React.FC<P> = (props) => {

			const hasPermission = useAppSelector(state => selectHasAllPermissions(state, requiredPermissions));

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